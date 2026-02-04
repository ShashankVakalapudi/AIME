import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UploadCloud, CheckCircle, Activity, FileText } from "lucide-react";
import { useAnalysis } from "../context/AnalysisContext";

const UploadCard = ({ title, subtitle, onSelect, selectedFile }) => {
  return (
    <div className={`relative w-full p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center gap-4 h-72 justify-center bg-white
      ${selectedFile 
        ? "border-blue-500 shadow-xl shadow-blue-100 scale-105" 
        : "border-slate-200 border-dashed hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-lg hover:-translate-y-1"
      }`}
    >
      <div className={`p-4 rounded-full transition-colors duration-300 ${selectedFile ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-100"}`}>
        {selectedFile ? <FileText size={36} /> : <UploadCloud size={36} />}
      </div>
      
      <div>
        <h3 className="font-bold text-xl text-slate-800 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 max-w-[220px] mx-auto leading-relaxed">
          {selectedFile ? (
            <span className="font-semibold text-blue-600 break-all">{selectedFile.name}</span>
          ) : (
            subtitle
          )}
        </p>
      </div>
      
      {/* Hidden File Input */}
      <input
        type="file"
        accept=".csv"
        onChange={(e) => onSelect(e.target.files[0])}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
    </div>
  );
};

const UploadPage = () => {
  const [systemFile, setSystemFile] = useState(null);
  const [networkFile, setNetworkFile] = useState(null);
  const [loginFile, setLoginFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const { setAnalysisResult } = useAnalysis();
  const navigate = useNavigate();

  const allSelected = systemFile && networkFile && loginFile;

  const handleAnalyzeAll = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("system", systemFile);
    formData.append("network", networkFile);
    formData.append("login", loginFile);

    try {
      const res = await axios.post("http://localhost:5000/analyze", formData);
      setAnalysisResult(res.data);
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        navigate("/dashboard");
      }, 1500);

    } catch (err) {
      console.error("Analysis failed", err);
      alert("Analysis failed. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // MAIN CONTAINER: centers everything perfectly
    <div className="flex flex-col flex-1 items-center justify-center w-full max-w-7xl mx-auto h-full py-10">
      
      {/* Header Text */}
      <div className="text-center mb-16 max-w-2xl animate-fade-in-up">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Upload Log Datasets
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          Select your System, Network, and Login CSV log files to initialize the anomaly detection AI engine.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-6 mb-16">
        <UploadCard 
          title="System Logs" 
          subtitle="Upload system_logs.csv" 
          onSelect={setSystemFile} 
          selectedFile={systemFile} 
        />
        <UploadCard 
          title="Network Logs" 
          subtitle="Upload network_logs.csv" 
          onSelect={setNetworkFile} 
          selectedFile={networkFile} 
        />
        <UploadCard 
          title="Login Logs" 
          subtitle="Upload login_logs.csv" 
          onSelect={setLoginFile} 
          selectedFile={loginFile} 
        />
      </div>

      {/* Action Button */}
      <button
        onClick={handleAnalyzeAll}
        disabled={!allSelected || loading}
        className={`
          relative px-12 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 transform
          flex items-center gap-3
          ${!allSelected || loading 
            ? "bg-slate-300 text-slate-500 cursor-not-allowed" 
            : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-95"
          }
        `}
      >
        {loading ? (
           <>
             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
             <span>Processing Analysis...</span>
           </>
        ) : (
           <>
             <Activity className="animate-pulse" size={24} />
             <span>Run AI Analysis</span>
           </>
        )}
      </button>

      {/* Success Popup Overlay */}
      {showPopup && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white px-12 py-10 rounded-3xl shadow-2xl text-center transform scale-100 animate-bounce-in">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-2">Analysis Complete!</h3>
            <p className="text-slate-500 text-lg">Redirecting to Dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;