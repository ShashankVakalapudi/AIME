const PanelCard = ({ title, subtitle }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 border-t-4 border-blue-500">

      <h3 className="font-semibold text-lg text-gray-800 mb-1">
        {title}
      </h3>

      <p className="text-sm text-gray-600">
        {subtitle}
      </p>

      {/* Chart placeholder */}
      <div className="mt-4 h-32 bg-blue-50 rounded flex items-center justify-center text-blue-500 font-medium text-sm">
        Chart Area
      </div>

    </div>
  );
};

export default PanelCard;
