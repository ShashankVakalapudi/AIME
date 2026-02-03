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

import { useEffect, useState } from "react";

// Dummy live data generator (later replace with backend API)
const generateData = () => {
  const time = new Date().toLocaleTimeString();

  return {
    time,
    cpu: Math.floor(40 + Math.random() * 60),
    memory: Math.floor(50 + Math.random() * 40),
    storage: Math.floor(60 + Math.random() * 30),
  };
};

const SystemLineChart = () => {
  const [data, setData] = useState([generateData()]);

  // Update every 3 seconds (simulate live data)
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev, generateData()];

        // Keep only last 8 points
        if (newData.length > 8) newData.shift();

        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-40">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" fontSize={10} />
          <YAxis domain={[0, 100]} />

          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="cpu"
            stroke="#2563eb"
            strokeWidth={2}
            name="CPU"
          />

          <Line
            type="monotone"
            dataKey="memory"
            stroke="#f97316"
            strokeWidth={2}
            name="Memory"
          />

          <Line
            type="monotone"
            dataKey="storage"
            stroke="#16a34a"
            strokeWidth={2}
            name="Storage"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
};

export default SystemLineChart;
