import SystemMonitoringPanel from "../components/SystemMonitoringPanel";
import SystemAnomalyTable from "../components/SystemAnomalyTable";

const SystemPage = () => (
  <div className="space-y-6">
    <SystemMonitoringPanel />
    <SystemAnomalyTable />
  </div>
);
export default SystemPage;