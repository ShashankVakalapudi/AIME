import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SystemMonitoringPanel from "../components/SystemMonitoringPanel";
import { useAnalysis } from "../context/AnalysisContext";
import { Link } from "react-router-dom";

const SystemPage = () => {
  // 1. Grab 'liveData' from the global context
  const { analysisResult, liveData } = useAnalysis();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 p-6 flex flex-col h-screen overflow-y-auto">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="flex-1 mt-6">
          {analysisResult ? (
             // 2. PASS THE LIVE GLOBAL HISTORY (Matches Dashboard)
             // Do NOT pass 'analysisResult.system.metrics' here
             <SystemMonitoringPanel history={liveData.sysHistory} />
          ) : (
             <div className="text-center mt-20 text-gray-500">
                No Analysis Data Available. <Link to="/upload" className="text-blue-600 underline">Upload Logs</Link>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemPage;