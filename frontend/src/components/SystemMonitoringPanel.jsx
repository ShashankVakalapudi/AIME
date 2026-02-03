import SeverityBadge from "./SeverityBadge";
import { systemAnomalies } from "../data/systemDummyData";
import SystemLineChart from "./SystemLineChart";


const SystemMonitoringPanel = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5">

      {/* Title */}
      <h3 className="font-semibold text-lg text-gray-800">
        System Monitoring
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        CPU, Memory, Resource Usage
      </p>

      {/* GRAPH PLACEHOLDER (will replace with real chart later) */}
      <SystemLineChart />


      {/* ROWS BELOW GRAPH */}
      <div className="mt-4">


        <h4 className="text-sm font-semibold text-gray-800 mb-2">
          Recent Anomalies
        </h4>

        <table className="w-full text-sm">

          <thead>
            <tr className="bg-gray-100 text-gray-900 font-bold">
              <th className="py-2 px-1 text-left">Time</th>
              <th className="py-2 px-1 text-left">Type</th>
              <th className="py-2 px-1 text-left">Severity</th>
            </tr>
          </thead>

          <tbody>
            {systemAnomalies.slice(0, 2).map((row, i) => (
              <tr
                key={i}
                className="bg-white hover:bg-blue-50"
              >

                {/* Time */}
                <td className="py-2 px-1 text-gray-900 font-semibold">
                  {row.time}
                </td>

                {/* Type */}
                <td className="py-2 px-1 text-gray-800 font-semibold">
                  {row.predicted_status}
                </td>

                {/* Severity */}
                <td className="py-2 px-1">
                  <span
                    className={
                      row.severity === "High"
                        ? "text-red-600 font-bold"
                        : row.severity === "Medium"
                        ? "text-orange-500 font-bold"
                        : "text-blue-600 font-bold"
                    }
                  >
                    {row.severity}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default SystemMonitoringPanel;
