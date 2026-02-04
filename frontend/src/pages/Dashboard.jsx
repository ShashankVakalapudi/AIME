import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import AlertsTable from "../components/AlertsTable";
import SystemMonitoringPanel from "../components/SystemMonitoringPanel";
import NetworkMonitoringPanel from "../components/NetworkMonitoringPanel";
import LoginMonitoringPanel from "../components/LoginMonitoringPanel";
import { useAnalysis } from "../context/AnalysisContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { analysisResult } = useAnalysis();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 1. If no data, show Empty State
  if (!analysisResult) {
    return (
      <div className="flex min-h-screen bg-slate-100 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col h-screen overflow-y-auto">
             <div className="p-4 md:p-6 pb-0">
                <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
             </div>
             
             <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Analysis Found</h2>
                    <p className="text-gray-500 mb-6">Please upload your system logs to generate a security report.</p>
                    <Link to="/upload" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Start New Analysis
                    </Link>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // 2. Calculate Stats
  const stats = [
    { title: "Total Anomalies", value: (analysisResult.system?.anomalies || 0) + (analysisResult.network?.intrusions || 0) + (analysisResult.login?.suspicious || 0) },
    { title: "System Anomalies", value: analysisResult.system?.anomalies || 0 },
    { title: "Network Intrusions", value: analysisResult.network?.intrusions || 0 },
    { title: "Suspicious Logins", value: analysisResult.login?.suspicious || 0 },
  ];

  // 3. Render Dashboard with Data
  return (
    <div className="flex min-h-screen bg-slate-100 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <div className="p-4 md:p-6 pb-0">
            <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </div>

        <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((item, index) => (
                <StatCard key={index} {...item} />
            ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <SystemMonitoringPanel data={analysisResult.system} />
            <NetworkMonitoringPanel data={analysisResult.network} />
            <LoginMonitoringPanel data={analysisResult.login} />
            </div>

            <AlertsTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;