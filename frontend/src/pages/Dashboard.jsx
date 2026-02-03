import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import AlertsTable from "../components/AlertsTable";
import SystemMonitoringPanel from "../components/SystemMonitoringPanel";
import NetworkMonitoringPanel from "../components/NetworkMonitoringPanel";
import LoginMonitoringPanel from "../components/LoginMonitoringPanel";

import { useAnalysis } from "../context/AnalysisContext";

const Dashboard = () => {
  const { analysisResult } = useAnalysis();

  // 🚫 no uploaded data yet
  if (!analysisResult) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">
          Upload files to view analysis
        </p>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Anomalies",
      value:
        analysisResult.system.anomalies +
        analysisResult.network.intrusions +
        analysisResult.login.suspicious,
    },
    {
      title: "System Anomalies",
      value: analysisResult.system.anomalies,
    },
    {
      title: "Network Intrusions",
      value: analysisResult.network.intrusions,
    },
    {
      title: "Suspicious Logins",
      value: analysisResult.login.suspicious,
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <Navbar />

        {/* 4 STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((item, index) => (
            <StatCard key={index} {...item} />
          ))}
        </div>

        {/* 3 PANELS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <SystemMonitoringPanel />
          <NetworkMonitoringPanel />
          <LoginMonitoringPanel />
        </div>

        <AlertsTable />
      </div>
    </div>
  );
};

export default Dashboard;
