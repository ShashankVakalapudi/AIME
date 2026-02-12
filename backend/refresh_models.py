import os
import joblib
import numpy as np
from sklearn.ensemble import IsolationForest, RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

# 1. Setup Models Folder
MODEL_FOLDER = 'models'
if not os.path.exists(MODEL_FOLDER):
    os.makedirs(MODEL_FOLDER)

print("⏳ Generating new compatible models...")

# --- 1. SYSTEM MODELS ---
print("   ... Training System Models")
# Dummy Data: [CPU, Memory, Disk]
X_sys = np.random.rand(100, 3) 
# Model A: Isolation Forest (Anomaly Detection)
sys_iso = IsolationForest(contamination=0.1, random_state=42)
sys_iso.fit(X_sys)
joblib.dump(sys_iso, f'{MODEL_FOLDER}/isolation_forest_system_model.pkl')

# Model B: Random Forest (Incident Classification)
y_sys = np.random.choice(["High CPU", "Memory Leak", "Disk Full"], 100)
sys_rf = RandomForestClassifier(n_estimators=10)
sys_rf.fit(X_sys, y_sys)
joblib.dump(sys_rf, f'{MODEL_FOLDER}/random_forest_incident_model.pkl')


# --- 2. NETWORK MODELS ---
print("   ... Training Network Models")
# Dummy Data: [Port, Protocol, Bytes]
X_net = np.random.rand(100, 3)
y_net = np.random.choice([0, 1], 100) # 0=Normal, 1=Attack

# Model A: Random Forest (Intrusion Detection)
net_rf = RandomForestClassifier(n_estimators=10)
net_rf.fit(X_net, y_net)
joblib.dump(net_rf, f'{MODEL_FOLDER}/network_intrusion_model.pkl')

# Model B: Encoder (Mocking it for compatibility)
net_enc = LabelEncoder()
net_enc.fit(["TCP", "UDP", "ICMP"])
joblib.dump(net_enc, f'{MODEL_FOLDER}/network_label_encoders.pkl')


# --- 3. LOGIN MODELS ---
print("   ... Training Login Models")
# Dummy Data: [IP_Integer, Time, Attempts]
X_log = np.random.rand(100, 3)
y_log = np.random.choice([0, 1], 100)

# Model A: Isolation Forest
login_iso = IsolationForest(contamination=0.1, random_state=42)
login_iso.fit(X_log)
joblib.dump(login_iso, f'{MODEL_FOLDER}/login_anomaly_iso_model.pkl')

# Model B: Random Forest
login_rf = RandomForestClassifier(n_estimators=10)
login_rf.fit(X_log, y_log)
joblib.dump(login_rf, f'{MODEL_FOLDER}/login_anomaly_rf_model.pkl')

print("✅ New models generated successfully in /models folder!")