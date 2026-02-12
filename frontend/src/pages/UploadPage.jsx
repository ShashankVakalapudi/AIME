import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UploadCloud, CheckCircle, Activity, Loader2 } from "lucide-react"; // Import Loader2
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAnalysis } from "../context/AnalysisContext";

const UploadCard = ({ title, subtitle, onSelect, file }) => {
  return (
    <div className={`bg-white p-6 md:p-8 min-h-[200px] md:min-h-[260px] rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col justify-center items-center text-center border ${file ? "border-green-500 bg-green-50" : "border-gray-100"}`}>
      {file ? <CheckCircle className="text-green-500 mb-3" size={40} /> : <UploadCloud className="text-blue-600 mb-3" size={40} />}
      <h3 className="font-bold text-lg text-gray-800">{title}</h3>
      <p className="text-xs text-gray-500 mt-1 mb-4">{file ? file.name : subtitle}</p>
      <input 
        type="file" 
        accept=".csv" 
        onChange={(e) => onSelect(e.target.files[0])} 
        className="block w-full text-xs text-slate-500 file:mr-2 file:py-2 file:px-3 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" 
      />
    </div>
  );
};

const UploadPage = () => {
  const [systemFile, setSystemFile] = useState(null);
  const [networkFile, setNetworkFile] = useState(null);
  const [loginFile, setLoginFile] = useState(null);
  
  // Loading State
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Initializing...");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { setAnalysisResult } = useAnalysis();
  const navigate = useNavigate();

  const handleAnalyzeAll = async () => {
    setIsLoading(true);
    setLoadingText("Uploading Datasets...");

    const formData = new FormData();
    formData.append("system", systemFile);
    formData.append("network", networkFile);
    formData.append("login", loginFile);

    try {
      // Simulate steps for realism
      setTimeout(() => setLoadingText("Running Isolation Forest..."), 1000);
      setTimeout(() => setLoadingText("Detecting Network Intrusions..."), 2000);
      setTimeout(() => setLoadingText("Analyzing User Behavior..."), 3500);

      const res = await axios.post("http://localhost:5000/analyze", formData);
      
      setAnalysisResult(res.data);
      setLoadingText("Analysis Complete!");
      
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 1000);

    } catch (err) {
      console.error("Analysis failed", err);
      alert("Backend Error: Make sure python app.py is running.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col w-full h-screen overflow-y-auto relative">
        <div className="p-4 md:p-6 pb-0">
            <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </div>

        <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10">
            <div className="w-full max-w-5xl">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">Upload Log Dataset</h2>
                <p className="text-gray-500">Select your System, Network, and Login CSV files to initialize the AI engine.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <UploadCard title="System Logs" subtitle="Upload system_logs.csv" onSelect={setSystemFile} file={systemFile} />
                <UploadCard title="Network Logs" subtitle="Upload network_logs.csv" onSelect={setNetworkFile} file={networkFile} />
                <UploadCard title="Login Logs" subtitle="Upload login_logs.csv" onSelect={setLoginFile} file={loginFile} />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleAnalyzeAll}
                  disabled={isLoading || !(systemFile && networkFile && loginFile)}
                  className={`
                    px-8 md:px-12 py-3 md:py-4 rounded-xl font-bold text-lg flex items-center gap-3 shadow-xl transition-all
                    ${isLoading ? "bg-gray-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700 text-white"}
                  `}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={24} />
                      {loadingText}
                    </>
                  ) : (
                    <>
                      <Activity size={24} />
                      Run Analysis Engine
                    </>
                  )}
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;