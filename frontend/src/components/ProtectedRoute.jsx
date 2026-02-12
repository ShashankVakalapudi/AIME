import { Navigate, Outlet } from "react-router-dom";
import { useAnalysis } from "../context/AnalysisContext";

const ProtectedRoute = () => {
  const { analysisResult } = useAnalysis();

  // If no analysis data, force user back to Upload Page
  if (!analysisResult) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;