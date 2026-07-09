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
        <h1 className="text-2xl font-bold tracking-tight text-white font-sans">Plant Zone Configurations</h1>
        <p className="text-sm text-slate-400">Configure target hazard levels, mandatory equipment lists, and supervisors for safety auditing.</p>
      </div>

      {/* Grid of Zone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.map((zone) => {
          const isAiActive = zone.aiStatus === 'Active';
          let riskColor = 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
          if (zone.riskLevel === 'Medium') riskColor = 'text-amber-400 border-amber-500/20 bg-amber-500/5';
          if (zone.riskLevel === 'High') riskColor = 'text-red-400 border-red-500/20 bg-red-500/5';

          return (
            <div key={zone.id} className="bg-[#111827] border border-slate-850 rounded-2xl p-5 shadow-xl hover:border-slate-800 transition-all flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-850">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4.5 w-4.5 text-blue-400" />
                    <h3 className="text-sm font-bold text-slate-205">{zone.name}</h3>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${riskColor}`}>
                    Risk: {zone.riskLevel}
                  </span>
                </div>

                {/* Details list */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-900 pb-1">
                    <span className="text-slate-450">Supervisor:</span>
                    <span className="font-semibold text-slate-205">{zone.supervisor}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1">
                    <span className="text-slate-450">Active Operators:</span>
                    <span className="font-mono text-slate-205">{zone.currentWorkers} workers</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1">
                    <span className="text-slate-450">Compliance Rate:</span>
                    <span className={`font-mono font-bold ${
                      zone.complianceRate > 95 ? 'text-emerald-400' : 'text-red-400'
                    }`}>{zone.complianceRate}%</span>
                  </div>
                </div>

                {/* Required PPE checkbox tags */}
                <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl space-y-1.5">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Mandatory PPE Required</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {zone.requiredPPE.map((ppe, i) => (
                      <span key={i} className="text-[10px] bg-slate-900 border border-slate-800 text-slate-350 px-2 py-0.5 rounded-md font-mono">
                        {ppe}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action and Toggles footer */}
              <div className="mt-5 pt-3.5 border-t border-slate-850/80 flex items-center justify-between">
                {/* AI Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleAi(zone.id)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                      isAiActive ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-slate-950 shadow ring-0 transition duration-200 ease-in-out ${
                        isAiActive ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">AI Monitor</span>
                </div>

                <button
                  onClick={() => handleConfigureZone(zone.name)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold rounded-xl text-xs transition-colors"
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
