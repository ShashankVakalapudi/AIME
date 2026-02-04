import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
      {/* 1. Fixed Sidebar */}
      <Sidebar />

      {/* 2. Main Content Wrapper */}
      {/* ml-64 pushes content to the right of the 64 (256px) sidebar */}
      <div className="flex-1 flex flex-col ml-64 min-h-screen transition-all duration-300">
        
        {/* 3. Navbar Fixed at Top */}
        <Navbar />
        
        {/* 4. Dynamic Page Content - Centers content inside it */}
        <main className="flex-1 p-8 flex flex-col relative overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;