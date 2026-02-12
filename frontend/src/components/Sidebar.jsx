import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Server, Shield, Lock, X, LogOut } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeClass = "bg-blue-600 shadow-lg text-white";
  const inactiveClass = "text-slate-300 hover:bg-white/10 hover:text-white";

  // ✅ UPDATED PATHS to match App.jsx
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard }, // Points to /dashboard, not /
    { name: "System Monitoring", path: "/system", icon: Server },
    { name: "Network Intrusion", path: "/network", icon: Shield },
    { name: "Login Anomalies", path: "/login-anomalies", icon: Lock }, // Points to new graph route
  ];

  const handleSignOut = () => {
    // In a real app, you would clear auth tokens here
    navigate("/"); // Redirect to Login Screen
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={onClose} 
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1437] text-white transition-transform duration-300 ease-in-out md:translate-x-0 md:static ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold tracking-wide">AI <span className="text-blue-500">Sentinel</span></h1>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8 px-4 space-y-2 flex-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                onClick={() => onClose && onClose()} 
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? activeClass : inactiveClass}`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sign Out Button */}
        <div className="p-4 mt-auto border-t border-white/10">
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-4 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-white/5 w-full rounded-xl transition-all"
            >
                <LogOut size={20} />
                <span>Sign Out</span>
            </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;