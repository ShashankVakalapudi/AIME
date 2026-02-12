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
  const { analysisResult, liveData } = useAnalysis();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // If no data, show upload prompt
  if (!analysisResult) return (
      <div className="flex min-h-screen bg-slate-100 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 flex flex-col h-screen overflow-y-auto">
             <div className="p-4 md:p-6 pb-0"><Navbar onMenuClick={() => setIsSidebarOpen(true)} /></div>
             <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Analysis Found</h2>
                    <Link to="/upload" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Start New Analysis</Link>
                </div>
            </div>
        </div>
      </div>
  );

  // Unwrap live data from Context (Data persists across tabs!)
  const { sysHistory, netHistory, logHistory, counters } = liveData;

  const stats = [
    { title: "Total Anomalies", value: counters.sys + counters.net + counters.log },
    { title: "System Anomalies", value: counters.sys },
    { title: "Network Intrusions", value: counters.net },
    { title: "Suspicious Logins", value: counters.log },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <div className="p-4 md:p-6 pb-0"><Navbar onMenuClick={() => setIsSidebarOpen(true)} /></div>
        <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {stats.map((item, index) => <StatCard key={index} {...item} />)}
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                <SystemMonitoringPanel history={sysHistory} />
                <NetworkMonitoringPanel history={netHistory} />
                <LoginMonitoringPanel history={logHistory} />
            </div>
            <AlertsTable 
                system={sysHistory.filter(x => x.predicted_status)} 
                network={netHistory.filter(x => x.type)} 
                login={logHistory.filter(x => x.type)} 
            />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;