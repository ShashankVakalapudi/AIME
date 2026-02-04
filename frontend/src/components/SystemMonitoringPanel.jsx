import SeverityBadge from "./SeverityBadge";
import SystemLineChart from "./SystemLineChart";

const SystemMonitoringPanel = ({ data }) => {
  // Use real data or fallback to empty array
  const anomalies = data?.details || [];

  return (
    <div className="bg-white rounded-xl shadow-lg p-5">
      <h3 className="font-semibold text-lg text-gray-800">
        System Monitoring
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        CPU, Memory, Resource Usage
      </p>

      {/* Pass data to chart if your chart component supports it */}
      <SystemLineChart />

      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">
          Recent Anomalies
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-900 font-bold">
                <th className="py-2 px-1 text-left">Time</th>
                <th className="py-2 px-1 text-left">Type</th>
                <th className="py-2 px-1 text-left">Severity</th>
              </tr>
            </thead>
            <tbody>
              {/* RENDER REAL DATA */}
              {anomalies.slice(0, 3).map((row, i) => (
                <tr key={i} className="bg-white hover:bg-blue-50 border-b last:border-0">
                  <td className="py-2 px-1 text-gray-900 font-semibold">
                    {row.time || "N/A"}
                  </td>
                  <td className="py-2 px-1 text-gray-800 font-semibold">
                    {row.predicted_status || "Anomaly"}
                  </td>
                  <td className="py-2 px-1">
                    <SeverityBadge level={row.severity || "Medium"} />
                  </td>
                </tr>
              ))}

              {anomalies.length === 0 && (
                <tr>
                  <td colSpan="3" className="py-4 text-center text-gray-400">
                    No anomalies detected
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoringPanel;