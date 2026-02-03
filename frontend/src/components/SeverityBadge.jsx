const SeverityBadge = ({ level }) => {
  const styles = {
    High: "bg-red-100 text-red-700 border border-red-300",
    Medium: "bg-orange-100 text-orange-700 border border-orange-300",
    Low: "bg-blue-100 text-blue-700 border border-blue-300",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[level]}`}
    >
      {level}
    </span>
  );
};

export default SeverityBadge;
