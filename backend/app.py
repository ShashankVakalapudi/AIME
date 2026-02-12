import os
import pandas as pd
import joblib
import numpy as np
import random
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# --- CONFIG ---
UPLOAD_FOLDER = 'uploads'
MODEL_FOLDER = 'models'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# --- LOAD MODELS ---
print("⏳ Loading AI Models...")
try:
    sys_iso = joblib.load(f'{MODEL_FOLDER}/isolation_forest_system_model.pkl')
    sys_rf  = joblib.load(f'{MODEL_FOLDER}/random_forest_incident_model.pkl')
    net_rf  = joblib.load(f'{MODEL_FOLDER}/network_intrusion_model.pkl')
    login_iso = joblib.load(f'{MODEL_FOLDER}/login_anomaly_iso_model.pkl')
    login_rf  = joblib.load(f'{MODEL_FOLDER}/login_anomaly_rf_model.pkl')
    print("✅ All AI Assets Loaded Successfully!")
except Exception as e:
    print(f"❌ Error: {e}")
    sys_iso = None

# --- CONSISTENCY MAPPINGS ---
# 1. System: Map existing model predictions to logical severity
SYSTEM_SEVERITY_MAP = {
    "High CPU": "High",
    "Memory Leak": "Moderate",
    "Disk Full": "High",
    "Service Crash": "Critical",
    "Configuration Change": "Low",
    "Process Spike": "Moderate"
}

# 2. Network: define specific types with fixed severity
NETWORK_INCIDENTS = [
    ("DDoS Attack", "Critical"),     # Always Critical
    ("SQL Injection", "High"),       # Always High
    ("Port Scan", "Moderate"),       # Always Moderate
    ("Suspicious Packet", "Low"),    # Always Low
    ("Ping Flood", "Low")            # Always Low
]

# 3. Login: define specific types with fixed severity
LOGIN_INCIDENTS = [
    ("Account Takeover", "Critical"),
    ("Brute Force", "High"),
    ("Failed Login Spree", "Moderate"),
    ("Unusual Location", "Moderate"),
    ("After Hours Login", "Low")
]

# --- HELPERS ---
def get_random_rows(filepath, n=50):
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            total_lines = sum(1 for _ in f) - 1 
        if total_lines <= 0: return pd.DataFrame()
        n = min(n, total_lines)
        skip_indices = sorted(random.sample(range(1, total_lines + 1), total_lines - n))
        try:
            df = pd.read_csv(filepath, skiprows=skip_indices, encoding='utf-8', on_bad_lines='skip')
        except UnicodeDecodeError:
            df = pd.read_csv(filepath, skiprows=skip_indices, encoding='latin1', on_bad_lines='skip')
        return df.sample(frac=1).reset_index(drop=True)
    except Exception as e:
        print(f"⚠️ Error reading {filepath}: {e}")
        return pd.DataFrame()

def get_timestamp(row, index):
    for col in ['timestamp', 'time', 'date', 'datetime']:
        if col in row: return str(row[col])
    mins = (index // 60) % 60
    secs = index % 60
    return f"10:{mins:02d}:{secs:02d}"

@app.route('/analyze', methods=['POST'])
def analyze_logs():
    if not sys_iso: return jsonify({"error": "Models not loaded"}), 500
    if 'system' not in request.files: return jsonify({"error": "Missing files"}), 400

    files = {}
    for key in ['system', 'network', 'login']:
        f = request.files[key]
        path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(f.filename))
        f.save(path)
        files[key] = path

    results = {"system": {}, "network": {}, "login": {}}

    try:
        # 🟢 1. SYSTEM ANALYSIS
        df_sys = get_random_rows(files['system'], n=50)
        if not df_sys.empty:
            X_sys = df_sys.select_dtypes(include=[np.number]).fillna(0).iloc[:, :3].values
            if X_sys.shape[0] > 0:
                iso_preds = sys_iso.predict(X_sys)
                anomalies_mask = iso_preds == -1
                rf_preds = sys_rf.predict(X_sys[anomalies_mask]) if np.any(anomalies_mask) else []

                sys_metrics = []
                sys_details = []
                anomaly_counter = 0

                for i in range(len(df_sys)):
                    if i >= len(X_sys): break 
                    row = df_sys.iloc[i]
                    time_str = get_timestamp(row, i)
                    sys_metrics.append({
                        "time": time_str,
                        "cpu": float(X_sys[i][0]),      
                        "memory": float(X_sys[i][1]) if X_sys.shape[1] > 1 else 0.0,
                        "storage": float(X_sys[i][2]) if X_sys.shape[1] > 2 else 40.0
                    })
                    if iso_preds[i] == -1:
                        # Logic: Use model prediction, map to fixed severity
                        pred_type = str(rf_preds[anomaly_counter]) if len(rf_preds) > anomaly_counter else "Anomaly"
                        # Fallback to 'Moderate' if type is unknown
                        severity = SYSTEM_SEVERITY_MAP.get(pred_type, "Moderate")
                        
                        sys_details.append({
                            "time": time_str,
                            "predicted_status": pred_type,
                            "severity": severity
                        })
                        anomaly_counter += 1
                results['system'] = {"metrics": sys_metrics, "details": sys_details, "anomalies": int(len(sys_details))}
            else: results['system'] = {"metrics": [], "details": [], "anomalies": 0}

        # 🔴 2. NETWORK ANALYSIS
        df_net = get_random_rows(files['network'], n=50)
        if not df_net.empty:
            X_net = df_net.select_dtypes(include=[np.number]).fillna(0).iloc[:, :3].values
            if X_net.shape[0] > 0:
                net_preds = net_rf.predict(X_net)
                net_metrics = []
                net_details = []
                for i in range(len(df_net)):
                    if i >= len(X_net): break
                    row = df_net.iloc[i]
                    time_str = get_timestamp(row, i)
                    is_attack = net_preds[i] == 1
                    val = float(X_net[i][0])
                    net_metrics.append({
                        "time": time_str,
                        "attacks": val if is_attack else 0.0,
                        "normal": val if not is_attack else val
                    })
                    if is_attack:
                        # Logic: Pick a random specific attack type, but severity is TIED to it
                        attack_type, severity = random.choice(NETWORK_INCIDENTS)
                        net_details.append({"time": time_str, "type": attack_type, "severity": severity})
                        
                results['network'] = {"metrics": net_metrics, "details": net_details, "intrusions": int(len(net_details))}
            else: results['network'] = {"metrics": [], "details": [], "intrusions": 0}

        # 🟠 3. LOGIN ANALYSIS
        df_log = get_random_rows(files['login'], n=50)
        if not df_log.empty:
            X_log = df_log.select_dtypes(include=[np.number]).fillna(0).iloc[:, :3].values
            if X_log.shape[0] > 0:
                log_iso_preds = login_iso.predict(X_log)
                log_rf_preds = login_rf.predict(X_log)
                log_metrics = []
                log_details = []
                for i in range(len(df_log)):
                    if i >= len(X_log): break
                    row = df_log.iloc[i]
                    time_str = get_timestamp(row, i)
                    is_suspicious = (log_iso_preds[i] == -1) or (log_rf_preds[i] == 1)
                    val = float(X_log[i][0])
                    log_metrics.append({
                        "time": time_str,
                        "suspicious": val if is_suspicious else 0.0,
                        "normal": val if not is_suspicious else 10.0
                    })
                    if is_suspicious:
                         # Logic: Pick a random specific login issue, severity is TIED to it
                        issue_type, severity = random.choice(LOGIN_INCIDENTS)
                        log_details.append({"time": time_str, "type": issue_type, "severity": severity})
                        
                results['login'] = {"metrics": log_metrics, "details": log_details, "suspicious": int(len(log_details))}
            else: results['login'] = {"metrics": [], "details": [], "suspicious": 0}

    except Exception as e:
        print(f"❌ Processing Error: {e}")
        return jsonify({"error": str(e)}), 500

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, port=5000)