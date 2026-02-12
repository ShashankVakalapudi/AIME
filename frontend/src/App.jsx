import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import Dashboard from "./pages/Dashboard";
import SystemPage from "./pages/SystemPage";
import NetworkPage from "./pages/NetworkPage";
import LoginPage from "./pages/LoginPage"; // This is your EXISTING Graph Page
import AuthPage from "./pages/AuthPage";   // This is the NEW Login Screen

// --- PROTECTED ROUTE WRAPPER ---
// If the user is not an admin, redirect them to the Login Screen ("/")
const ProtectedRoute = ({ isAdmin, children }) => {
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <Routes>
      {/* 1. PUBLIC LOGIN ROUTE (Default) */}
      <Route 
        path="/" 
        element={<AuthPage onAdminLogin={setIsAdminLoggedIn} />} 
      />

      {/* 2. PROTECTED ROUTES (Only accessible after login) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAdmin={isAdminLoggedIn}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute isAdmin={isAdminLoggedIn}>
            <UploadPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/system"
        element={
          <ProtectedRoute isAdmin={isAdminLoggedIn}>
            <SystemPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/network"
        element={
          <ProtectedRoute isAdmin={isAdminLoggedIn}>
            <NetworkPage />
          </ProtectedRoute>
        }
      />
      
      {/* 3. RENAMED ROUTE FOR GRAPHS */}
      {/* We moved the old '/login' graph page to '/login-anomalies' */}
      <Route
        path="/login-anomalies"
        element={
          <ProtectedRoute isAdmin={isAdminLoggedIn}>
            <LoginPage /> 
          </ProtectedRoute>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;