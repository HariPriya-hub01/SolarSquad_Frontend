import React, { useState } from 'react';
import { Lightbulb, Percent, TrendingDown, DollarSign, HeartPulse, ShieldCheck, Zap, Hammer } from 'lucide-react';
import { SMART_RECOMMENDATIONS } from '../data/mockData';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState(SMART_RECOMMENDATIONS);

  const handleImplement = (id) => {
    alert(`Initiating dispatch request for suggestion ${id}. Safety task added to Plant Maintenance Queue.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 font-sans">Smart Recommendations</h1>
        <p className="text-sm text-slate-500 font-light">AI-generated action plans and engineering controls to mitigate plant floor safety infractions.</p>
      </div>

      {/* Grid of Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec) => {
          let priorityColor = 'text-red-700 border border-red-200 bg-red-50';
          if (rec.priority === 'Medium') priorityColor = 'text-amber-700 border border-amber-200 bg-amber-50';

          return (
            <div key={rec.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between animate-fade-in">
              
              <div className="space-y-4">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-3">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-lg bg-blue-600/10 text-blue-600 border border-blue-600/20 mt-0.5">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">{rec.recommendation}</h3>
                      <span className="text-[10px] text-slate-400 font-mono">Target: {rec.location}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Forecasted Reduction</span>
                    <span className="text-xl font-mono font-bold text-emerald-700">-{rec.expectedReduction}%</span>
                  </div>
                </div>

                {/* Details list */}
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider mb-0.5">Priority</span>
                    <span className={`text-[10px] font-bold uppercase ${
                      rec.priority === 'High' ? 'text-red-705' : 'text-amber-705'
                    } ${priorityColor}`}>{rec.priority}</span>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider mb-0.5">Cost</span>
                    <span className="text-[10px] text-slate-700 font-semibold uppercase">{rec.cost}</span>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider mb-0.5">Expected Impact</span>
                    <span className="text-[10px] text-emerald-700 font-bold uppercase">{rec.impact}</span>
                  </div>
                </div>

                {/* Rationale description */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[9px] text-slate-450 font-bold uppercase tracking-wider block mb-1">EHS Rationale Check</span>
                  <p className="text-[11px] text-slate-655 leading-relaxed font-light">
                    {rec.rationale}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3.5 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[9px] text-slate-400 font-mono">Suggested code: {rec.id}</span>
                <button
                  onClick={() => handleImplement(rec.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-200 text-blue-600 text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  <Hammer className="h-3.5 w-3.5" />
                  Deploy Intervention
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
