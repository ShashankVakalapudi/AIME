import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import NetworkMonitoringPanel from "../components/NetworkMonitoringPanel";
import { useAnalysis } from "../context/AnalysisContext";
import { Link } from "react-router-dom";

const NetworkPage = () => {
  const { analysisResult, liveData } = useAnalysis();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 p-6 flex flex-col h-screen overflow-y-auto">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="flex-1 mt-6">
          {analysisResult ? (
             // ✅ Use Global Live Network History
             <NetworkMonitoringPanel history={liveData.netHistory} />
          ) : (
             <div className="text-center mt-20 text-gray-500">
                No Analysis Data. <Link to="/upload" className="text-blue-600 underline">Upload Logs</Link>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;