import { createContext, useContext, useState, useEffect, useRef } from "react";

const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [analysisResult, setAnalysisResult] = useState(null);

  // --- GLOBAL SIMULATION STATE ---
  const [sysHistory, setSysHistory] = useState([]);
  const [netHistory, setNetHistory] = useState([]);
  const [logHistory, setLogHistory] = useState([]);
  const [counters, setCounters] = useState({ sys: 0, net: 0, log: 0 });

  const indexRef = useRef(0);

  // Start the simulation engine whenever new data arrives
  useEffect(() => {
    if (!analysisResult) return;

    // Reset history when new analysis starts
    setSysHistory([]);
    setNetHistory([]);
    setLogHistory([]);
    setCounters({ sys: 0, net: 0, log: 0 });
    indexRef.current = 0;

    const fullSys = analysisResult.system.metrics || []; 
    const fullNet = analysisResult.network.metrics || [];
    const fullLog = analysisResult.login.metrics || [];
    
    const sysDetails = analysisResult.system.details || [];
    const netDetails = analysisResult.network.details || [];
    const logDetails = analysisResult.login.details || [];

    const interval = setInterval(() => {
        const i = indexRef.current;
        const sysItem = fullSys[i % fullSys.length]; 
        const netItem = fullNet[i % fullNet.length];
        const logItem = fullLog[i % fullLog.length];

        if (!sysItem) return;

        // Find Anomalies for this timestamp
        const sysAnomaly = sysDetails.find(d => d.time === sysItem.time);
        const netAnomaly = netDetails.find(d => d.time === netItem.time);
        const logAnomaly = logDetails.find(d => d.time === logItem.time);

        // ✅ FIXED: Added 'severity' to the merged objects below
        
        // 1. Update System History
        setSysHistory(prev => [
            ...prev.slice(-19), 
            { 
                ...sysItem, 
                predicted_status: sysAnomaly?.predicted_status,
                severity: sysAnomaly?.severity // <--- WAS MISSING
            }
        ]);

        // 2. Update Network History
        setNetHistory(prev => [
            ...prev.slice(-19), 
            { 
                ...netItem, 
                type: netAnomaly?.type,
                severity: netAnomaly?.severity // <--- WAS MISSING
            }
        ]);

        // 3. Update Login History
        setLogHistory(prev => [
            ...prev.slice(-19), 
            { 
                ...logItem, 
                type: logAnomaly?.type,
                severity: logAnomaly?.severity // <--- WAS MISSING
            }
        ]);

        // Update Global Counters
        setCounters(prev => ({
            sys: prev.sys + (sysAnomaly ? 1 : 0),
            net: prev.net + (netAnomaly ? 1 : 0),
            log: prev.log + (logAnomaly ? 1 : 0)
        }));

        indexRef.current += 1;
    }, 1500); // 1.5 Seconds Speed

    return () => clearInterval(interval);
  }, [analysisResult]);

  return (
    <AnalysisContext.Provider value={{ 
        analysisResult, 
        setAnalysisResult,
        liveData: { sysHistory, netHistory, logHistory, counters } 
    }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => useContext(AnalysisContext);