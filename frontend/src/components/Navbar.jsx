const Navbar = () => {
  return (
    <div className="bg-white shadow px-6 py-3 rounded-xl mb-6 flex justify-between items-center">

      {/* Page Title */}
      <h2 className="text-xl font-semibold text-gray-800">
        Dashboard
      </h2>

      {/* User Section */}
      <div className="flex items-center gap-3">

        <span className="text-sm text-gray-600">
          Admin
        </span>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
          VA
        </div>

      </div>
    </div>
  );
};

export default Navbar;
