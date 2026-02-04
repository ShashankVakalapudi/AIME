import StatCard from "../components/StatCard";
import AlertsTable from "../components/AlertsTable";
import SystemMonitoringPanel from "../components/SystemMonitoringPanel";
import NetworkMonitoringPanel from "../components/NetworkMonitoringPanel";
import LoginMonitoringPanel from "../components/LoginMonitoringPanel";
import { useAnalysis } from "../context/AnalysisContext";

const Dashboard = () => {
  const { analysisResult } = useAnalysis();

  if (!analysisResult) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400">
        <p className="text-lg">No analysis data found.</p>
        <p className="text-sm">Please go back to Upload.</p>
      </div>
    );
  }

  const stats = [
    { title: "Total Anomalies", value: analysisResult.system.anomalies + analysisResult.network.intrusions + analysisResult.login.suspicious },
    { title: "System Anomalies", value: analysisResult.system.anomalies },
    { title: "Network Intrusions", value: analysisResult.network.intrusions },
    { title: "Suspicious Logins", value: analysisResult.login.suspicious },
  ];

  return (
    <div className="space-y-8">
      {/* 4 STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </div>

      {/* 3 PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SystemMonitoringPanel />
        <NetworkMonitoringPanel />
        <LoginMonitoringPanel />
      </div>

      {/* ALERTS TABLE */}
      <div className="w-full">
        <AlertsTable />
      </div>
    </div>
  );
};

export default Dashboard;