import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import NetworkMonitoringPanel from "../components/NetworkMonitoringPanel";

const NetworkPage = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 p-6">

        <Navbar />

        <NetworkMonitoringPanel />

      </div>
    </div>
  );
};

export default NetworkPage;
