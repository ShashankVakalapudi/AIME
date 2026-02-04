import { Menu, Search, Bell, UserCircle } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm px-6 py-4 flex items-center justify-between mb-8 sticky top-4 z-30">
      
      {/* Left Side: Menu Button & Title */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100 md:hidden text-gray-600 transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <h2 className="text-xl font-bold text-gray-800 hidden sm:block">
          Security Dashboard
        </h2>
        {/* Mobile Title (Smaller) */}
        <h2 className="text-lg font-bold text-gray-800 sm:hidden">
          Dashboard
        </h2>
      </div>

      {/* Right Side: Profile & Actions */}
      <div className="flex items-center gap-4">
        
        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">Security Analyst</p>
          </div>
          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
             VA
          </div>
        </div>
      </div>

    </div>
  );
};

export default Navbar;