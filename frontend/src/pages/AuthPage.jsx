import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Shield, AlertCircle, Eye, EyeOff, Briefcase } from "lucide-react";

const AuthPage = ({ onAdminLogin }) => {
  const [role, setRole] = useState("user"); // 'user' or 'admin'
  const [identifier, setIdentifier] = useState(""); // Stores Employee ID or Admin ID
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For Eye Toggle
  const [error, setError] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false); // To show the User Status Message
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (role === "admin") {
      // --- ADMIN LOGIN LOGIC ---
      // Requirement: Admin / Admin@123
      if (identifier === "Admin" && password === "Admin@123") {
        onAdminLogin(true); // Grant Access
        navigate("/dashboard");
      } else {
        setError("Invalid Admin Credentials");
      }
    } else {
      // --- USER LOGIN LOGIC ---
      if (identifier && password) {
        // Requirement: Show status message instead of logging in
        setUserLoggedIn(true);
      } else {
        setError("Please fill in all fields.");
      }
    }
  };

  // --- VIEW: USER STATUS MESSAGE ---
  if (userLoggedIn && role === 'user') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-10 text-center animate-fadeIn">
          <div className="mx-auto w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
            <Briefcase size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">System Status</h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Data is running.<br />
            <span className="font-semibold text-blue-600">Check in the admin portal.</span>
          </p>
          <button
            onClick={() => { setUserLoggedIn(false); setIdentifier(""); setPassword(""); }}
            className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // --- VIEW: LOGIN FORM ---
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        
        {/* Header Section */}
        <div className={`p-8 text-center ${role === 'admin' ? 'bg-slate-900' : 'bg-blue-600'} transition-colors duration-300`}>
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            {role === 'admin' ? <Shield className="text-white" size={32} /> : <User className="text-white" size={32} />}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-blue-100 text-sm">
            {role === 'admin' ? "Secure Admin Portal" : "User Access Portal"}
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex p-2 bg-gray-50 m-6 rounded-lg border border-gray-200">
          <button
            onClick={() => { setRole("user"); setError(""); setIdentifier(""); setPassword(""); }}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
              role === "user" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            User Login
          </button>
          <button
            onClick={() => { setRole("admin"); setError(""); setIdentifier(""); setPassword(""); }}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
              role === "admin" ? "bg-white text-slate-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Admin Login
          </button>
        </div>

        {/* Form Section */}
        <form onSubmit={handleLogin} className="px-8 pb-8 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <div>
            {/* Dynamic Label: Admin ID vs Employee ID */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {role === 'admin' ? "Admin ID" : "Employee ID"}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder={role === 'admin' ? "Admin" : "EMP12345"}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Eye Icon Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2.5 rounded-lg font-bold text-white transition-all transform hover:scale-[1.02] ${
              role === 'admin' 
                ? 'bg-slate-900 hover:bg-slate-800' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {role === 'admin' ? "Access Dashboard" : "Check Status"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;    