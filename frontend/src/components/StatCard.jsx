const StatCard = ({ title, value }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-5 rounded-xl shadow-lg">

      <p className="text-sm opacity-90">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
};

export default StatCard;
