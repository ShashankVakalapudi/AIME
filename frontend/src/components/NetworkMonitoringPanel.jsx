import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
} from "recharts";

const NetworkMonitoringPanel = ({ data }) => {
  // Extract real data
  const anomalies = data?.details || [];
  const metrics = data?.metrics || []; // Ensure backend sends 'metrics' for the chart

  return (
    <div className="bg-white rounded-xl shadow-lg p-5">
      <h3 className="font-semibold text-lg text-gray-800">
        Network Intrusions
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Traffic & Threat Analysis
      </p>

      {/* Dynamic Graph */}
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={metrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" fontSize={10} />
            <YAxis hide />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="attacks"
              stroke="#dc2626"
              strokeWidth={2}
              dot={false}
              name="Attacks"
            />
          </LineChart>
        </ResponsiveContainer>
        
        {metrics.length === 0 && (
             <div className="flex items-center justify-center h-full -mt-40 bg-slate-50 opacity-80">
                <span className="text-xs text-gray-400">No chart data available</span>
            </div>
        )}
      </div>

      {/* Dynamic Table */}
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">
          Recent Intrusions
        </h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-900 font-bold">
              <th className="py-2 text-left">Time</th>
              <th className="py-2 text-left">Type</th>
              <th className="py-2 text-left">Severity</th>
            </tr>
          </thead>
          <tbody>
            {anomalies.slice(0, 3).map((row, i) => (
                <tr key={i} className="bg-white hover:bg-blue-50 border-b last:border-0">
                    <td className="py-2 text-gray-900 font-semibold">{row.time}</td>
                    <td className="py-2 text-gray-800 font-semibold">{row.type || "Intrusion"}</td>
                    <td className="py-2">
                        <span className="text-red-600 font-bold">{row.severity || "High"}</span>
                    </td>
                </tr>
            ))}
             {anomalies.length === 0 && (
                <tr>
                    <td colSpan="3" className="py-4 text-center text-gray-400">No intrusions detected</td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NetworkMonitoringPanel;