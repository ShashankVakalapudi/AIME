// Line graph data (time‑series)
export const systemMetrics = [
  { time: "10:00", cpu: 45, memory: 60, storage: 70 },
  { time: "10:05", cpu: 52, memory: 65, storage: 72 },
  { time: "10:10", cpu: 95, memory: 85, storage: 98 }, // anomaly
  { time: "10:15", cpu: 55, memory: 62, storage: 74 },
  { time: "10:20", cpu: 48, memory: 59, storage: 71 },
];

// Table rows (derived from ML output)
export const systemAnomalies = [
  {
    time: "25 Apr 10:10",
    cpu: 95,
    memory: 85,
    storage: 98,
    predicted_status: "Disk_Issue",
    severity: "High",
  },
  {
    time: "25 Apr 09:55",
    cpu: 78,
    memory: 82,
    storage: 70,
    predicted_status: "Performance_Issue",
    severity: "Medium",
  },
  {
    time: "25 Apr 09:40",
    cpu: 68,
    memory: 75,
    storage: 65,
    predicted_status: "System_Anomaly",
    severity: "Low",
  },
];
