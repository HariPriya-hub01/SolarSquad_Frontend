import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import Dashboard from './pages/Dashboard';
import LiveMonitoring from './pages/LiveMonitoring';
import IncidentAnalysis from './pages/IncidentAnalysis';
import ContextIntelligence from './pages/ContextIntelligence';
import PredictionCenter from './pages/PredictionCenter';
import RootCauseAnalytics from './pages/RootCauseAnalytics';
import WorkerInsights from './pages/WorkerInsights';
import Recommendations from './pages/Recommendations';
import Reports from './pages/Reports';
import CameraManagement from './pages/CameraManagement';
import ZoneManagement from './pages/ZoneManagement';
import Settings from './pages/Settings';
import { API_BASE_URL } from './config';

export default function App() {
  // Deploy trigger comment to force Vercel webhook build
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Send a sample SMS notification on initial page mount (reload)
    fetch(`${API_BASE_URL}/api/test-sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log('[EHS HEARTBEAT] Page reload test SMS response:', data);
    })
    .catch(err => {
      console.error('[EHS HEARTBEAT] Failed to dispatch reload test SMS:', err);
    });
  }, []);


  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'live': return <LiveMonitoring />;
      case 'incidents': return <IncidentAnalysis />;
      case 'context': return <ContextIntelligence />;
      case 'prediction': return <PredictionCenter />;
      case 'rootcause': return <RootCauseAnalytics />;
      case 'workers': return <WorkerInsights />;
      case 'recommendations': return <Recommendations />;
      case 'reports': return <Reports />;
      case 'cameras': return <CameraManagement />;
      case 'zones': return <ZoneManagement />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex bg-brand-bg min-h-screen text-slate-800 font-sans w-full overflow-x-hidden">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto w-full mx-auto">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}
