import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UploadCloud, CheckCircle, Activity } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAnalysis } from "../context/AnalysisContext";

// Keep your UploadCard component as is...
const UploadCard = ({ title, subtitle, onSelect }) => {
  return (
    <div className="bg-white p-6 md:p-8 min-h-[200px] md:min-h-[260px] rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col justify-center items-center text-center border border-gray-100">
      <UploadCloud className="text-blue-600 mb-3" size={40} />
      <h3 className="font-bold text-lg text-gray-800">{title}</h3>
      <p className="text-xs text-gray-500 mt-1 mb-4">{subtitle}</p>
      <input type="file" accept=".csv" onChange={(e) => onSelect(e.target.files[0])} className="block w-full text-xs text-slate-500 file:mr-2 file:py-2 file:px-3 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
    </div>
  );
};

const UploadPage = () => {
  const [systemFile, setSystemFile] = useState(null);
  const [networkFile, setNetworkFile] = useState(null);
  const [loginFile, setLoginFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Responsive State

  const { setAnalysisResult } = useAnalysis();
  const navigate = useNavigate();

  const handleAnalyzeAll = async () => {
    const formData = new FormData();
    formData.append("system", systemFile);
    formData.append("network", networkFile);
    formData.append("login", loginFile);

    try {
      const res = await axios.post("http://localhost:5000/analyze", formData);
      setAnalysisResult(res.data);
      setShowPopup(true);
      setTimeout(() => { setShowPopup(false); navigate("/"); }, 1200);
    } catch (err) {
      console.error("Analysis failed", err);
      alert("Backend not connected.");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 overflow-hidden">
      
      {/* Responsive Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col w-full h-screen overflow-y-auto">
        
        <div className="p-4 md:p-6 pb-0">
            <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </div>

        <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10">
            <div className="w-full max-w-5xl">
              
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">Upload Dataset</h2>
                <p className="text-gray-500">Upload all CSV logs to initialize the engine.</p>
              </div>

              {/* Responsive Grid: 1 column on mobile, 3 on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <UploadCard title="System Logs" subtitle="System usage CSV" onSelect={setSystemFile} />
                <UploadCard title="Network Logs" subtitle="Network traffic CSV" onSelect={setNetworkFile} />
                <UploadCard title="Login Logs" subtitle="User auth CSV" onSelect={setLoginFile} />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleAnalyzeAll}
                  disabled={!(systemFile && networkFile && loginFile)}
                  className="px-8 md:px-12 py-3 md:py-4 rounded-xl font-bold text-lg flex items-center gap-3 shadow-xl bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                >
                  <Activity size={24} />
                  Run Analysis
                </button>
              </div>

            </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white px-8 py-6 rounded-2xl text-center shadow-2xl">
            <CheckCircle className="text-green-500 mx-auto mb-4" size={50} />
            <h3 className="text-xl font-bold">Analysis Completed</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;