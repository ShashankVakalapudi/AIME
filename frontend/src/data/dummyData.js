export const stats = [
  { title: "Total Anomalies", value: 578 },
  { title: "System Anomalies", value: 145 },
  { title: "Network Intrusions", value: 238 },
  { title: "Suspicious Logins", value: 195 },
];

export const alerts = [
  {
    time: "25 Apr 10:24",
    module: "Login",
    severity: "High",
    prediction: "Account Takeover",
    status: "Open",
  },
  {
    time: "25 Apr 10:20",
    module: "Network",
    severity: "Moderate",
    prediction: "Bot Attack",
    status: "Resolved",
  },
  {
    time: "25 Apr 09:55",
    module: "System",
    severity: "Low",
    prediction: "CPU Spike",
    status: "Monitoring",
  },
];
