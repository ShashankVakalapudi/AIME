const StatCard = ({ title,QPvalue, color = "blue" }) => {
  const colorMap = {
    red: "bg-red-50 text-red-600",
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
    indigo: "bg-indigo-50 text-indigo-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">
          {title}
        </h3>
        <div className={`p-2 rounded-lg ${colorMap[color] || colorMap.blue}`}>
          <div className="w-2 h-2 rounded-full bg-current"></div>
        </div>
      </div>
      <h2 className="text-3xl font-extrabold text-slate-800">
        {value}
      </h2>
    </div>
  );
};

export default StatCard;