import SeverityBadge from "./SeverityBadge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  loginMetrics,
  loginAnomalies,
} from "../data/securityDummyData";

const LoginMonitoringPanel = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5">

      <h3 className="font-semibold text-lg text-gray-800">
        Login Anomalies
      </h3>

      <p className="text-sm text-gray-500 mb-4">
        Suspicious Authentication
      </p>

      {/* Graph */}
      <div className="h-40">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={loginMetrics}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="time" fontSize={10} />
            <YAxis />

            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="suspicious"
              stroke="#dc2626"
              strokeWidth={2}
              name="Suspicious"
            />

            <Line
              type="monotone"
              dataKey="normal"
              stroke="#16a34a"
              strokeWidth={2}
              name="Normal"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* Rows */}
      <div className="mt-4">

        <h4 className="text-sm font-semibold text-gray-800 mb-2">
          Recent Login Issues
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
            {loginAnomalies.map((row, i) => (
                <tr
                key={i}
                className="bg-white hover:bg-blue-50"
                >

                <td className="py-2 text-gray-900 font-semibold">
                    {row.time}
                </td>

                <td className="py-2 text-gray-800 font-semibold">
                    {row.type}
                </td>

                <td className="py-2">
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

export default LoginMonitoringPanel;
