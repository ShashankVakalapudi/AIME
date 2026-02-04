const PanelCard = ({ title, subtitle, children }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="px-6 py-5 border-b border-slate-100">
        <h3 className="font-bold text-lg text-slate-800">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      <div className="p-6 flex-1">
        {children}
      </div>
    </div>
  );
};

export default PanelCard;