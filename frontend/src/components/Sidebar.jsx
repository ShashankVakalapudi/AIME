import { NavLink } from "react-router-dom";


const Sidebar = () => {
  return (
    <div className="w-56 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col">

      {/* Logo */}
      <div className="p-5 text-lg font-bold border-b border-slate-700">
        AI Enterprise
      </div>

      {/* Menu */}
      <ul className="flex-1 p-3 space-y-2 text-sm">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `block px-3 py-2 rounded transition ${
              isActive
                ? "bg-blue-600 text-white font-semibold"
                : "text-gray-200 hover:bg-blue-500"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/system"
          className={({ isActive }) =>
            `block px-3 py-2 rounded transition ${
              isActive
                ? "bg-blue-600 text-white font-semibold"
                : "text-gray-200 hover:bg-blue-500"
            }`
          }
        >
          System Monitoring
        </NavLink>

        <NavLink
          to="/network"
          className={({ isActive }) =>
            `block px-3 py-2 rounded transition ${
              isActive
                ? "bg-blue-600 text-white font-semibold"
                : "text-gray-200 hover:bg-blue-500"
            }`
          }
        >
          Network Intrusions
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            `block px-3 py-2 rounded transition ${
              isActive
                ? "bg-blue-600 text-white font-semibold"
                : "text-gray-200 hover:bg-blue-500"
            }`
          }
        >
          Login Anomalies
        </NavLink>

        <NavLink
          to="/upload"
          className={({ isActive }) =>
            `block px-3 py-2 rounded transition ${
              isActive
                ? "bg-blue-600 text-white font-semibold"
                : "text-gray-200 hover:bg-blue-500"
            }`
          }
        >
          Upload Files
        </NavLink>

      </ul>



      {/* Logout */}
      <div className="p-4 border-t border-slate-700 text-red-400 text-sm cursor-pointer">
        Logout
      </div>

    </div>
  );
};

export default Sidebar;
