import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SystemMonitoringPanel from "../components/SystemMonitoringPanel";

const SystemPage = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 p-6">

        <Navbar />

        <SystemMonitoringPanel />

      </div>
    </div>
  );
};

export default SystemPage;
