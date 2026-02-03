// Network graph
export const networkMetrics = [
  { time: "10:00", attacks: 20, normal: 80 },
  { time: "10:05", attacks: 35, normal: 65 },
  { time: "10:10", attacks: 60, normal: 40 },
  { time: "10:15", attacks: 25, normal: 75 },
];

// Network rows
export const networkAnomalies = [
  {
    time: "25 Apr 10:15",
    type: "Bot Attack",
    severity: "High",
  },
  {
    time: "25 Apr 09:50",
    type: "Port Scan",
    severity: "Medium",
  },
];

// Login graph
export const loginMetrics = [
  { time: "10:00", normal: 40, suspicious: 5 },
  { time: "10:05", normal: 35, suspicious: 12 },
  { time: "10:10", normal: 28, suspicious: 20 },
  { time: "10:15", normal: 42, suspicious: 6 },
];

// Login rows
export const loginAnomalies = [
  {
    time: "25 Apr 10:12",
    type: "Account Takeover",
    severity: "High",
  },
  {
    time: "25 Apr 09:40",
    type: "Multiple Failures",
    severity: "Medium",
  },
];
