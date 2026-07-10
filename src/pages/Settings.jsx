import React, { useState } from 'react';
import { Sliders, Bell, UserCheck, Shield, Clock, ShieldAlert, Save } from 'lucide-react';

export default function Settings() {
  const [confidence, setConfidence] = useState(85);
  const [hapticAlerts, setHapticAlerts] = useState(true);
  const [escalateSupervisor, setEscalateSupervisor] = useState(true);
  const [shiftStart, setShiftStart] = useState('06:00');
  const [shiftEnd, setShiftEnd] = useState('14:30');

  const handleSaveSettings = () => {
    alert('All EHS parameters and AI configurations compiled and successfully saved. Deploying configs to local Edge clusters.');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 font-sans">System Settings</h1>
          <p className="text-sm text-slate-500 font-light">Configure global computer vision parameters, notifications routing, and plant shift rules.</p>
        </div>
        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
        >
          <Save className="h-4 w-4" />
          Save Configurations
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Left Side: AI Model & Notification Settings */}
        <div className="space-y-6">
          
          {/* AI Model Parameters */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200">
              <Sliders className="h-4 w-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">AI Detection Thresholds</h2>
            </div>
            
            <div className="space-y-4 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-600">Edge Inference Confidence Limit:</span>
                  <span className="font-mono text-blue-600 font-bold">{confidence}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="99"
                  value={confidence}
                  onChange={(e) => setConfidence(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <p className="text-[10px] text-slate-400 leading-relaxed font-light">
                  Model detections below this confidence rating are filtered out to prevent false alerts. Recommended baseline: 85%.
                </p>
              </div>

              <div className="space-y-3.5 border-t border-slate-200 pt-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Compliance Severity Filters</span>
                <label className="flex items-center justify-between text-slate-700 cursor-pointer font-medium">
                  <span>Require Bounding Box validation for hard hats</span>
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 focus:ring-blue-500 text-blue-605" />
                </label>
                <label className="flex items-center justify-between text-slate-700 cursor-pointer font-medium">
                  <span>Enable Worker Skeletal tracking for glove detection</span>
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 focus:ring-blue-500 text-blue-605" />
                </label>
              </div>
            </div>
          </div>

          {/* Notification settings */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200">
              <Bell className="h-4 w-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Alert Routing Rules</h2>
            </div>

            <div className="space-y-3.5 text-xs">
              <label className="flex items-center justify-between text-slate-700 cursor-pointer border-b border-slate-100 pb-3">
                <div>
                  <span className="font-semibold block">Haptic Wrist Alerts (SmartWatch)</span>
                  <span className="text-[10px] text-slate-400 font-light block">Trigger direct wrist vibrations on worker band for minor omissions.</span>
                </div>
                <input
                  type="checkbox"
                  checked={hapticAlerts}
                  onChange={(e) => setHapticAlerts(e.target.checked)}
                  className="rounded border-slate-300 focus:ring-blue-500 text-blue-605"
                />
              </label>

              <label className="flex items-center justify-between text-slate-700 cursor-pointer pt-1">
                <div>
                  <span className="font-semibold block">EHS Shift Supervisor Escalate</span>
                  <span className="text-[10px] text-slate-400 font-light block">Auto-escalate to area lead if infraction remains uncorrected for &gt;2 mins.</span>
                </div>
                <input
                  type="checkbox"
                  checked={escalateSupervisor}
                  onChange={(e) => setEscalateSupervisor(e.target.checked)}
                  className="rounded border-slate-300 focus:ring-blue-500 text-blue-605"
                />
              </label>
            </div>
          </div>

        </div>

        {/* Right Side: Shift timings & Roles */}
        <div className="space-y-6">
          
          {/* Shift Timings */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200">
              <Clock className="h-4 w-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Shift Schedule Timings</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-500 block font-semibold mb-1">Shift A Morning Start</label>
                <input
                  type="time"
                  value={shiftStart}
                  onChange={(e) => setShiftStart(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="text-slate-500 block font-semibold mb-1">Shift A Morning End</label>
                <input
                  type="time"
                  value={shiftEnd}
                  onChange={(e) => setShiftEnd(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:bg-white"
                />
              </div>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed font-light">
              Compliance averages automatically adjust during Shift handover overlaps (15 mins window).
            </p>
          </div>

          {/* Roles & Permissions */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200">
              <UserCheck className="h-4 w-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Roles & Permissions Matrix</h2>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <span className="font-semibold text-slate-800 block">EHS Manager</span>
                  <span className="text-[10px] text-slate-400 block">Full config and override clearance.</span>
                </div>
                <span className="text-[10px] bg-blue-600/10 text-blue-600 font-bold px-2 py-0.5 rounded border border-blue-200 shadow-sm">Admin</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <span className="font-semibold text-slate-800 block">Area Supervisor</span>
                  <span className="text-[10px] text-slate-400 block">Acknowledge alerts and manage zone checklists.</span>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded border border-slate-200 shadow-sm">Supervisor</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="font-semibold text-slate-800 block">EHS Inspector</span>
                  <span className="text-[10px] text-slate-400 block">Read-only monitoring views and report generation.</span>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded border border-slate-200 shadow-sm">Inspector</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
