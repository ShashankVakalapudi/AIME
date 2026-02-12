import React from "react";
import { Activity, Server, Shield, AlertTriangle } from "lucide-react";

// ✅ DESTRUCTURING PROPS CORRECTLY
const StatCard = ({ title, value }) => { 
  
  let Icon = Activity;
  let colorClass = "text-blue-600 bg-blue-100";

  if (title.includes("System")) { Icon = Server; colorClass = "text-purple-600 bg-purple-100"; }
  else if (title.includes("Network")) { Icon = Shield; colorClass = "text-red-600 bg-red-100"; }
  else if (title.includes("Login") || title.includes("Suspicious")) { Icon = AlertTriangle; colorClass = "text-orange-600 bg-orange-100"; }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wide">{title}</h3>
        {/* ✅ SAFETY CHECK FOR VALUE */}
        <p className="text-2xl font-extrabold text-gray-800 mt-1">
          {value !== undefined ? value : 0} 
        </p>
      </div>
    </div>
  );
};

export default StatCard;