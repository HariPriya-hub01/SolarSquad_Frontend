import React, { useState } from 'react';
import { Users, Search, GraduationCap, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { WORKERS } from '../data/mockData';

export default function WorkerInsights() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWorkers = WORKERS.filter(worker => 
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">Worker Safety Insights</h1>
          <p className="text-sm text-slate-400">Detailed safety compliance tracking and training audits for plant floor personnel.</p>
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search workers by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Grid of Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map((worker) => {
          let ratingColor = 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
          if (worker.safetyRating.startsWith('B')) ratingColor = 'text-amber-400 border-amber-500/20 bg-amber-500/5';
          if (worker.safetyRating.startsWith('C') || worker.complianceRate < 90) ratingColor = 'text-red-400 border-red-500/20 bg-red-500/5';

          return (
            <div key={worker.id} className="bg-[#111827] border border-slate-850 rounded-2xl p-5 shadow-xl hover:border-slate-800 transition-all flex flex-col justify-between">
              
              {/* Profile Header */}
              <div className="pb-3 border-b border-slate-850 flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-200">{worker.name}</h3>
                  <span className="text-[10px] text-slate-500 font-mono">{worker.id} | Dept: {worker.department}</span>
                </div>
                <div className={`px-2.5 py-1 rounded-xl border text-sm font-mono font-bold ${ratingColor}`}>
                  Rating: {worker.safetyRating}
                </div>
              </div>

              {/* Stats Breakdown */}
              <div className="py-4 space-y-3.5">
                {/* Compliance rate */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-450">Compliance Rate</span>
                    <span className="font-mono font-bold text-slate-205">{worker.complianceRate}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-950 border border-slate-900 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        worker.complianceRate === 100 ? 'bg-emerald-500' : worker.complianceRate > 90 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${worker.complianceRate}%` }}
                    ></div>
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-400 pt-1">
                  <div className="p-2.5 bg-slate-950/40 border border-slate-850 rounded-xl">
                    <span className="text-slate-500 block uppercase font-bold tracking-wider text-[8px] mb-0.5">Total Violations</span>
                    <span className="font-mono font-bold text-slate-250">{worker.totalViolations}</span>
                  </div>
                  <div className="p-2.5 bg-slate-950/40 border border-slate-850 rounded-xl">
                    <span className="text-slate-500 block uppercase font-bold tracking-wider text-[8px] mb-0.5">Avg Response</span>
                    <span className="font-mono font-bold text-slate-250">{worker.avgResponseTime}</span>
                  </div>
                  <div className="p-2.5 bg-slate-950/40 border border-slate-850 rounded-xl">
                    <span className="text-slate-500 block uppercase font-bold tracking-wider text-[8px] mb-0.5">Most Missed PPE</span>
                    <span className="font-mono font-bold text-slate-250 truncate block">{worker.mostMissedPpe}</span>
                  </div>
                  <div className="p-2.5 bg-slate-950/40 border border-slate-850 rounded-xl">
                    <span className="text-slate-500 block uppercase font-bold tracking-wider text-[8px] mb-0.5">Risk Trend</span>
                    <span className={`font-semibold ${
                      worker.riskTrend === 'Increasing' ? 'text-red-400' : worker.riskTrend === 'Excellent' ? 'text-emerald-400' : 'text-slate-300'
                    }`}>{worker.riskTrend}</span>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="pt-3 border-t border-slate-850 bg-slate-950/20 -mx-5 -mb-5 p-5 rounded-b-2xl">
                <div className="flex gap-2 items-start text-[10px]">
                  <GraduationCap className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 uppercase font-bold tracking-wider block">Training Action Plan</span>
                    <p className="text-slate-350 leading-relaxed font-light mt-0.5">{worker.trainingRecommendation}</p>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
        {filteredWorkers.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 text-sm">
            No employee profiles found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
