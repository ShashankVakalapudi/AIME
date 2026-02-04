import { Routes, Route, Navigate } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import Dashboard from "./pages/Dashboard";
// import SystemPage from "./pages/SystemPage"; // Uncomment when created
// import NetworkPage from "./pages/NetworkPage"; // Uncomment when created
// import LoginPage from "./pages/LoginPage"; // Uncomment when created

function App() {
  return (
    <Routes>
      {/* 1. Default route goes to Dashboard */}
      <Route path="/" element={<Dashboard />} />
      
      {/* 2. Upload Page Route */}
      <Route path="/upload" element={<UploadPage />} />
      
      {/* 3. Redirect unknown routes to Dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;