import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import UploadPage from "./pages/UploadPage";
import Dashboard from "./pages/Dashboard";
import SystemPage from "./pages/SystemPage";
import NetworkPage from "./pages/NetworkPage";
import LoginPage from "./pages/LoginPage";
import { AnalysisProvider } from "./context/AnalysisContext";

function App() {
  return (
    <AnalysisProvider>
      <Routes>
        {/* Layout wraps all routes */}
        <Route element={<Layout />}>
          
          {/* Default Route is Upload */}
          <Route path="/" element={<UploadPage />} />

          {/* Other Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/system" element={<SystemPage />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/login" element={<LoginPage />} />
          
        </Route>
      </Routes>
    </AnalysisProvider>
  );
}

export default App;