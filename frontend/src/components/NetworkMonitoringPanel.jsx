import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const NetworkMonitoringPanel = ({ history }) => {
  // ✅ Updated Color Logic
  const getSeverityColor = (level) => {
    switch (level?.toLowerCase()) {
        case 'critical': return 'text-red-700';
        case 'high':     return 'text-red-500';
        case 'moderate': return 'text-orange-500'; // Orange
        case 'low':      return 'text-green-600';  // Green
        default:         return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col h-full">
      <h3 className="font-semibold text-lg text-gray-800">Network Intrusion</h3>
      <p className="text-sm text-gray-500 mb-4">Traffic & Threat Analysis</p>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" fontSize={10} />
            <YAxis hide /><Tooltip contentStyle={{ borderRadius: '8px' }} /><Legend verticalAlign="bottom" height={36} />
            <Line type="monotone" dataKey="attacks" stroke="#dc2626" strokeWidth={2} dot={false} name="Attacks" />
            <Line type="monotone" dataKey="normal" stroke="#3b82f6" strokeWidth={2} dot={false} name="Normal Traffic" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 flex-1 min-h-0">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Recent Intrusions</h4>
        <div className="overflow-y-auto max-h-60 border border-gray-100 rounded-lg">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-50">
              <tr className="text-gray-900 font-bold"><th className="py-2 px-3 text-left">Time</th><th className="py-2 px-3 text-left">Type</th><th className="py-2 px-3 text-left">Severity</th></tr>
            </thead>
            <tbody>
              {[...history].reverse().slice(0, 10).map((row, i) => (
                row.type && (
                <tr key={i} className="bg-white hover:bg-blue-50 border-b last:border-0 animate-fadeIn">
                    <td className="py-2 px-3 text-gray-900 font-semibold">{row.time}</td>
                    <td className="py-2 px-3 text-gray-800 font-semibold">{row.type}</td>
                    <td className="py-2 px-3"><span className={`font-bold ${getSeverityColor(row.severity)}`}>{row.severity || "Critical"}</span></td>
                </tr>
                )
              ))}
              {history.length === 0 && <tr><td colSpan="3" className="py-4 text-center text-gray-400">Waiting for data...</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default NetworkMonitoringPanel;