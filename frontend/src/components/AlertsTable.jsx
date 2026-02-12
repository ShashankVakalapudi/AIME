import { AlertTriangle, Clock, Server, Shield, Users } from "lucide-react";
import { useEffect, useState } from "react";

const AlertsTable = ({ system = [], network = [], login = [] }) => {
  const [activeAlerts, setActiveAlerts] = useState([]);

  useEffect(() => {
    const sysFormatted = system.map(item => ({ ...item, module: "System", icon: Server, color: "text-purple-600" }));
    const netFormatted = network.map(item => ({ ...item, module: "Network", icon: Shield, color: "text-blue-600" }));
    const logFormatted = login.map(item => ({ ...item, module: "Login", icon: Users, color: "text-orange-600" }));

    setActiveAlerts(prev => {
        const combinedNew = [...sysFormatted, ...netFormatted, ...logFormatted];
        const uniqueNew = combinedNew.filter(
            newItem => !prev.some(existing => existing.time === newItem.time && existing.module === newItem.module)
        );
        return [...uniqueNew, ...prev]; 
    });
  }, [system, network, login]);

  // ✅ Updated Color Logic
  const getSeverityBadge = (level) => {
    switch (level?.toLowerCase()) {
        case 'critical': return 'bg-red-100 text-red-800 border-red-200';
        case 'high':     return 'bg-red-50 text-red-600 border-red-100';
        case 'moderate': return 'bg-orange-50 text-orange-600 border-orange-100'; // Moderate -> Orange
        case 'medium':   return 'bg-orange-50 text-orange-600 border-orange-100'; 
        case 'low':      return 'bg-green-50 text-green-600 border-green-100';    // Low -> Green
        default:         return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6 flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
            <AlertTriangle className="text-red-500" />
            Active Security Alerts
          </h3>
          <p className="text-sm text-gray-500">Live stream of detected anomalies</p>
        </div>
        <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Live</span>
        </div>
      </div>
      <div className="overflow-y-auto flex-1 border border-gray-100 rounded-lg custom-scrollbar">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gray-50 z-10 shadow-sm">
            <tr className="text-gray-500 uppercase text-xs tracking-wider">
              <th className="py-3 px-4 text-left font-semibold">Timestamp</th>
              <th className="py-3 px-4 text-left font-semibold">Module</th>
              <th className="py-3 px-4 text-left font-semibold">Severity</th>
              <th className="py-3 px-4 text-left font-semibold">Prediction</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {activeAlerts.map((alert, index) => {
              const Icon = alert.icon || AlertTriangle;
              return (
                <tr key={index} className="hover:bg-red-50/30 transition-colors animate-fadeIn">
                  <td className="py-3 px-4 text-gray-600 font-mono flex items-center gap-2 whitespace-nowrap"><Clock size={14} className="text-gray-400" />{alert.time}</td>
                  <td className="py-3 px-4"><span className={`flex items-center gap-2 font-bold ${alert.color}`}><Icon size={16} />{alert.module}</span></td>
                  <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-bold border ${getSeverityBadge(alert.severity)}`}>{alert.severity || "Moderate"}</span></td>
                  <td className="py-3 px-4 text-gray-800 font-medium">{alert.predicted_status || alert.type || "Unknown"}</td>
                </tr>
              );
            })}
             {activeAlerts.length === 0 && <tr><td colSpan="4" className="py-10 text-center text-gray-400 italic">Waiting for alerts...</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AlertsTable;