import { NavLink } from "react-router-dom";
import { LayoutDashboard, Server, ShieldAlert, Users, UploadCloud, LogOut } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { path: "/", label: "New Analysis", icon: <UploadCloud size={20} /> },
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/system", label: "System Monitor", icon: <Server size={20} /> },
    { path: "/network", label: "Network Security", icon: <ShieldAlert size={20} /> },
    { path: "/login", label: "User Access", icon: <Users size={20} /> },
  ];

  return (
    <aside className="fixedPc left-0 top-0 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col shadow-2xl z-50">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
        <div className="text-xl font-bold tracking-wide text-white">
          <span className="text-blue-500">AI</span> Sentinel
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"} 
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                  : "hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className={({ isActive }) => isActive ? "text-white" : "text-slate-400 group-hover:text-white"}>
              {item.icon}
            </span>
            <span className="font-medium text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;