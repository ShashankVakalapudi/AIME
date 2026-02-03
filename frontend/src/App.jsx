import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SystemPage from "./pages/SystemPage";
import NetworkPage from "./pages/NetworkPage";
import LoginPage from "./pages/LoginPage";
import UploadPage from "./pages/UploadPage";
import { AnalysisProvider } from "./context/AnalysisContext";

function App() {
  return (
    <AnalysisProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/system" element={<SystemPage />} />
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </AnalysisProvider>
  );
}

export default App;
