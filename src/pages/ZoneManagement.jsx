import React, { useState } from 'react';
import { Layers, Sliders, CheckSquare, ShieldCheck, HelpCircle } from 'lucide-react';
import { ZONES } from '../data/mockData';

export default function ZoneManagement() {
  const [zones, setZones] = useState(ZONES);

  const handleToggleAi = (zoneId) => {
    setZones(zones.map(z => {
      if (z.id === zoneId) {
        const nextStatus = z.aiStatus === 'Active' ? 'Suspended' : 'Active';
        alert(`AI Safety Monitoring for "${z.name}" is now: ${nextStatus.toUpperCase()}`);
        return { ...z, aiStatus: nextStatus };
      }
      return z;
    }));
  };

  const handleConfigureZone = (zoneName) => {
    alert(`Opening PPE Compliance Threshold parameters for: ${zoneName}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-850 font-sans">Plant Zone Configurations</h1>
        <p className="text-sm text-slate-505 font-light">Configure target hazard levels, mandatory equipment lists, and supervisors for safety auditing.</p>
      </div>

      {/* Grid of Zone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.map((zone) => {
          const isAiActive = zone.aiStatus === 'Active';
          let riskColor = 'text-emerald-700 border border-emerald-200 bg-emerald-50';
          if (zone.riskLevel === 'Medium') riskColor = 'text-amber-705 border border-amber-200 bg-amber-50';
          if (zone.riskLevel === 'High') riskColor = 'text-red-705 border border-red-200 bg-red-50';

          return (
            <div key={zone.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between animate-fade-in">
              
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4.5 w-4.5 text-blue-600" />
                    <h3 className="text-sm font-bold text-slate-800">{zone.name}</h3>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${riskColor}`}>
                    Risk: {zone.riskLevel}
                  </span>
                </div>

                {/* Details list */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-400">Supervisor:</span>
                    <span className="font-semibold text-slate-800">{zone.supervisor}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-400">Active Operators:</span>
                    <span className="font-mono text-slate-800">{zone.currentWorkers} workers</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-400">Compliance Rate:</span>
                    <span className={`font-mono font-bold ${
                      zone.complianceRate > 95 ? 'text-emerald-700' : 'text-red-700'
                    }`}>{zone.complianceRate}%</span>
                  </div>
                </div>

                {/* Required PPE checkbox tags */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 shadow-inner">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Mandatory PPE Required</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {zone.requiredPPE.map((ppe, i) => (
                      <span key={i} className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md font-mono shadow-sm">
                        {ppe}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action and Toggles footer */}
              <div className="mt-5 pt-3.5 border-t border-slate-200 flex items-center justify-between">
                {/* AI Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleAi(zone.id)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                      isAiActive ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        isAiActive ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI Monitor</span>
                </div>

                <button
                  onClick={() => handleConfigureZone(zone.name)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-650 font-bold rounded-xl text-xs transition-colors shadow-sm"
                >
                  <Sliders className="h-3 w-3" />
                  Configure
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
