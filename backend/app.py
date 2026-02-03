from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# -------- LOAD MODELS --------
system_model = joblib.load("models/system_model.pkl")
system_scaler = joblib.load("models/system_scaler.pkl")

network_model = joblib.load("models/network_rf_model.pkl")
network_encoder = joblib.load("models/network_encoder.pkl")

login_iso_model = joblib.load("models/login_iso_model.pkl")
login_rf_model = joblib.load("models/login_rf_model.pkl")


def safe_label_encode(series, encoder):
    """
    Encodes values using LabelEncoder.
    Unseen values → -1 (safe for tree models)
    """
    known_classes = set(encoder.classes_)
    return series.astype(str).apply(
        lambda x: encoder.transform([x])[0] if x in known_classes else -1
    )


@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        system_file = request.files.get("system")
        network_file = request.files.get("network")
        login_file = request.files.get("login")

        if not system_file or not network_file or not login_file:
            return jsonify({"error": "All 3 files are required"}), 400

        # -------- SAVE FILES --------
        system_path = os.path.join(UPLOAD_FOLDER, system_file.filename)
        network_path = os.path.join(UPLOAD_FOLDER, network_file.filename)
        login_path = os.path.join(UPLOAD_FOLDER, login_file.filename)

        system_file.save(system_path)
        network_file.save(network_path)
        login_file.save(login_path)

        system_df = pd.read_csv(system_path)
        network_df = pd.read_csv(network_path)
        login_df = pd.read_csv(login_path)

        # -------- SYSTEM --------
        system_features = system_df[
            ["cpu_utilization", "memory_usage", "storage_usage"]
        ]
        system_scaled = system_scaler.transform(system_features)
        system_pred = system_model.predict(system_scaled)
        system_anomalies = int((system_pred == -1).sum())

        # -------- NETWORK --------
        network_features = network_df[
            [
                "Port",
                "Request_Type",
                "Protocol",
                "Payload_Size",
                "User_Agent",
                "Status",
                "Scan_Type"
            ]
        ].copy()

        cat_cols = [
            "Request_Type",
            "Protocol",
            "User_Agent",
            "Status",
            "Scan_Type"
        ]

        for col in cat_cols:
            network_features[col] = safe_label_encode(
                network_features[col],
                network_encoder
            )

        network_pred = network_model.predict(network_features)
        network_intrusions = int((network_pred == 1).sum())

        # -------- LOGIN --------
        login_features = login_df[
            [
                "ASN",
                "Device Type",
                "Browser Name and Version",
                "OS Name and Version",
                "Login Successful",
                "Is Attack IP"
            ]
        ]

        login_iso_pred = login_iso_model.predict(login_features)
        login_rf_pred = login_rf_model.predict(login_features)

        login_suspicious = int((login_iso_pred == -1).sum())
        login_attacks = int((login_rf_pred == 1).sum())

        return jsonify({
            "system": {"anomalies": system_anomalies},
            "network": {"intrusions": network_intrusions},
            "login": {
                "suspicious": login_suspicious,
                "attacks": login_attacks
            }
        })

    except Exception as e:
        print("BACKEND ERROR:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
