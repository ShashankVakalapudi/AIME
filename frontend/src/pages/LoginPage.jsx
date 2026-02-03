import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import LoginMonitoringPanel from "../components/LoginMonitoringPanel";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 p-6">

        <Navbar />

        <LoginMonitoringPanel />

      </div>
    </div>
  );
};

export default LoginPage;
