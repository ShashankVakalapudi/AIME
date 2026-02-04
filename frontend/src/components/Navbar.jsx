import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  // Dynamic Title Logic
  const getPageTitle = (path) => {
    switch (path) {
      case "/": return "Upload Dataset";
      case "/dashboard": return "Security Overview";
      case "/system": return "System Monitoring";
      case "/network": return "Network Intrusion Detection";
      case "/login": return "Authentication Logs";
      default: return "Dashboard";
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 px-8 h-20 flex justify-between items-center sticky top-0 z-40 shadow-sm">
      
      {/* Page Title */}
      <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
        {getPageTitle(location.pathname)}
      </h2>

      {/* Right Side: Admin User Only */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-sm font-bold text-slate-700">Admin User</p>
          <p className="text-xs text-slate-500">Security Analyst</p>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md border-2 border-white ring-2 ring-slate-100">
          VA
        </div>
      </div>
    </div>
  );
};

export default Navbar;