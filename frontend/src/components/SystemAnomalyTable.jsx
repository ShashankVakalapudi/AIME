import { systemAnomalies } from "../data/systemDummyData";
import SeverityBadge from "./SeverityBadge";

const SystemAnomalyTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 mt-6">

      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recent System Anomalies
      </h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-blue-50 text-gray-700">
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">CPU (%)</th>
            <th className="p-3 text-left">Memory (%)</th>
            <th className="p-3 text-left">Storage (%)</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Severity</th>
          </tr>
        </thead>

        <tbody>
          {systemAnomalies.slice(0, 3).map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-3">{row.time}</td>
              <td className="p-3">{row.cpu}</td>
              <td className="p-3">{row.memory}</td>
              <td className="p-3">{row.storage}</td>
              <td className="p-3 font-medium text-gray-700">
                {row.predicted_status}
              </td>
              <td className="p-3">
                <SeverityBadge level={row.severity} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SystemAnomalyTable;
