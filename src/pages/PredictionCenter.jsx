import React, { useState } from 'react';
import { TrendingUp, Clock, AlertTriangle, AlertCircle, RefreshCw, Send, CheckCircle2, ChevronRight } from 'lucide-react';
import { PREDICTIONS } from '../data/mockData';

export default function PredictionCenter() {
  const [predictions, setPredictions] = useState(PREDICTIONS);

  const handleSendReminder = (workerId, riskType) => {
    alert(`Sending proactive EHS notification to supervisor and haptic wrist alert to worker ${workerId} for: "${riskType}"`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white font-sans">Prediction Center</h1>
        <p className="text-sm text-slate-400">AI forecasting models analyzing behavioral patterns, fatigue telemetry, and historical plant records to prevent safety violations before they happen.</p>
      </div>

      {/* Grid split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Upcoming safety risks timeline */}
        <div className="xl:col-span-1 bg-[#111827] border border-slate-850 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-2.5 border-b border-[#1e293b] mb-4">
              <Clock className="h-4 w-4 text-blue-400" />
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Predictive Timeline (Shift A)</h2>
            </div>

            <div className="relative border-l border-slate-800 pl-4 ml-2 space-y-5">
              
              <div className="relative">
                <span className="absolute -left-[21px] top-1 flex h-2 w-2 rounded-full bg-red-500 ring-4 ring-[#0b1120] animate-pulse"></span>
                <span className="text-[10px] text-slate-500 font-mono block">16:30 - 17:00</span>
                <h4 className="text-xs font-semibold text-slate-200">Glove adjustments at Assembly Station B</h4>
                <p className="text-[10px] text-slate-450 mt-0.5">High probability of PPE removal due to local thermal index crossing 31°C.</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[21px] top-1 flex h-2 w-2 rounded-full bg-amber-500 ring-4 ring-[#0b1120]"></span>
                <span className="text-[10px] text-slate-500 font-mono block">17:15 - 18:00</span>
                <h4 className="text-xs font-semibold text-slate-200">Paint booth fatigue anomaly</h4>
                <p className="text-[10px] text-slate-450 mt-0.5">Painter Elena Rostova reaching 4.5hr shift mark. Mask compliance forecast to drop to 72%.</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[21px] top-1 flex h-2 w-2 rounded-full bg-blue-500 ring-4 ring-[#0b1120]"></span>
                <span className="text-[10px] text-slate-500 font-mono block">18:30 (Shift Handover)</span>
                <h4 className="text-xs font-semibold text-slate-200">PPE Glove dispenser depletion</h4>
                <p className="text-[10px] text-slate-450 mt-0.5">Welding station glove cache forecast to go below safety threshold levels.</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[21px] top-1 flex h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-[#0b1120]"></span>
                <span className="text-[10px] text-slate-500 font-mono block">19:00</span>
                <h4 className="text-xs font-semibold text-slate-200">Compliance normalization</h4>
                <p className="text-[10px] text-slate-450 mt-0.5">Fresh Shift B workers on floor. Forecasted compliance levels: 99.5%.</p>
              </div>

            </div>
          </div>

          <div className="pt-3 border-t border-slate-850 text-xs text-slate-500">
            Updates recalculate every 15 minutes.
          </div>
        </div>

        {/* Prediction Cards Grid */}
        <div className="xl:col-span-2 bg-[#111827] border border-slate-850 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#1e293b]">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">AI Predictive Compliance Alerts</h2>
            </div>
            <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded font-mono font-bold">
              3 Risks Forecasted
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {predictions.map((pred) => {
              let borderClass = 'border-slate-850 hover:border-slate-800';
              let confColor = 'text-blue-400';
              if (pred.confidence > 80) {
                borderClass = 'border-red-500/20 hover:border-red-500/40 bg-red-500/5';
                confColor = 'text-red-400';
              } else if (pred.confidence > 70) {
                borderClass = 'border-amber-500/20 hover:border-amber-500/40 bg-amber-500/5';
                confColor = 'text-amber-400';
              }

              return (
                <div key={pred.id} className={`p-4 bg-slate-950/60 border rounded-2xl transition-all flex flex-col justify-between ${borderClass}`}>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider">Prediction target</span>
                        <h3 className="text-sm font-bold text-slate-200">{pred.workerName || pred.zone}</h3>
                        {pred.workerId && <span className="text-[10px] text-slate-500 font-mono">{pred.workerId} ({pred.zone})</span>}
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider">Confidence</span>
                        <span className={`text-base font-mono font-bold ${confColor}`}>{pred.confidence}%</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-900/60 border border-slate-850 rounded-xl">
                      <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider">Predicted risk</span>
                      <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mt-0.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                        {pred.riskType}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-450 leading-relaxed font-light mt-1">
                      {pred.reason}
                    </p>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-slate-855/80 flex items-center justify-between">
                    <span className="text-[10px] text-slate-550 font-mono">Timeframe: {pred.timeframe}</span>
                    <button
                      onClick={() => handleSendReminder(pred.workerId || 'Supervisor', pred.riskType)}
                      className="flex items-center gap-1 px-2.5 py-1 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-400 hover:text-blue-300 text-[10px] font-bold rounded-lg transition-colors"
                    >
                      <Send className="h-3 w-3" />
                      Buzz Shift Lead
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
