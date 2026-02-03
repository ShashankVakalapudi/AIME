import { alerts } from "../data/dummyData";

const AlertsTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 mt-6">

      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Active Alerts
      </h3>

      <table className="w-full text-sm">

        <thead>
          <tr className="bg-blue-50 text-gray-700">
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">Module</th>
            <th className="p-3 text-left">Severity</th>
            <th className="p-3 text-left">Prediction</th>
          </tr>
        </thead>

        <tbody>
          {alerts.map((a, i) => (
            <tr key={i} className="hover:bg-gray-50">

              <td className="p-3 text-gray-700">{a.time}</td>
              <td className="p-3 text-gray-700">{a.module}</td>

              {/* Severity */}
              <td className="p-3 font-bold">
                <span
                  className={
                    a.severity === "High"
                      ? "text-red-600"
                      : a.severity === "Moderate"
                      ? "text-orange-500"
                      : "text-green-600"
                  }
                >
                  {a.severity}
                </span>
              </td>

              <td className="p-3 text-gray-700">{a.prediction}</td>

              {/* Status */}
              

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default AlertsTable;
