import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { UploadCloud, CheckCircle, Activity } from "lucide-react";
import { useAnalysis } from "../context/AnalysisContext";

/* Upload Card */
const UploadCard = ({ title, subtitle, onSelect }) => {
  return (
    <div className="bg-white p-8 min-h-[260px] rounded-xl shadow-lg hover:shadow-2xl hover:bg-blue-50 transition-all">
      <div className="flex items-center gap-3 mb-5">
        <UploadCloud className="text-blue-600" size={32} />
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => onSelect(e.target.files[0])}
        className="block w-full text-sm border rounded-md p-2"
      />
    </div>
  );
};

const UploadPage = () => {
  const [systemFile, setSystemFile] = useState(null);
  const [networkFile, setNetworkFile] = useState(null);
  const [loginFile, setLoginFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const { setAnalysisResult } = useAnalysis();
  const navigate = useNavigate();

  const allSelected = systemFile && networkFile && loginFile;

  const handleAnalyzeAll = async () => {
    const formData = new FormData();
    formData.append("system", systemFile);
    formData.append("network", networkFile);
    formData.append("login", loginFile);

    try {
      const res = await axios.post(
        "http://localhost:5000/analyze",
        formData
      );

      // 🔑 store ML result in context
      setAnalysisResult(res.data);

      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/"); // dashboard
      }, 1200);

    } catch (err) {
      console.error("Analysis failed", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 p-6 flex flex-col">
        <Navbar />

        <div className="max-w-6xl mx-auto mt-4">
          <h2 className="text-2xl font-semibold mb-2">
            Upload Dataset Files
          </h2>
          <p className="text-gray-500 mb-8">
            Upload all CSV files and analyze together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
          <UploadCard
            title="System Logs"
            subtitle="Upload system monitoring CSV"
            onSelect={setSystemFile}
          />
          <UploadCard
            title="Network Logs"
            subtitle="Upload intrusion detection CSV"
            onSelect={setNetworkFile}
          />
          <UploadCard
            title="Login Logs"
            subtitle="Upload authentication CSV"
            onSelect={setLoginFile}
          />
        </div>

        <div className="max-w-6xl mx-auto w-full">
          <button
            onClick={handleAnalyzeAll}
            disabled={!allSelected}
            className="w-full md:w-1/3 bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Activity size={20} />
            Analyse
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white px-8 py-6 rounded-xl text-center">
            <CheckCircle className="text-green-500 mx-auto mb-3" size={48} />
            <h3 className="text-lg font-semibold">Analysis Completed</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
