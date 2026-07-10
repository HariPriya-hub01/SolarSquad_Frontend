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
          <h1 className="text-2xl font-bold tracking-tight text-slate-850 font-sans">Worker Safety Insights</h1>
          <p className="text-sm text-slate-500 font-light">Detailed safety compliance tracking and training audits for plant floor personnel.</p>
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search workers by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-805 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Grid of Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map((worker) => {
          let ratingColor = 'text-emerald-705 border border-emerald-200 bg-emerald-50';
          if (worker.safetyRating.startsWith('B')) ratingColor = 'text-amber-705 border border-amber-200 bg-amber-50';
          if (worker.safetyRating.startsWith('C') || worker.complianceRate < 90) ratingColor = 'text-red-705 border border-red-200 bg-red-50';

          return (
            <div key={worker.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between animate-fade-in">
              
              {/* Profile Header */}
              <div className="pb-3 border-b border-slate-200 flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{worker.name}</h3>
                  <span className="text-[10px] text-slate-400 font-mono">{worker.id} | Dept: {worker.department}</span>
                </div>
                <div className={`px-2.5 py-1 rounded-xl text-sm font-mono font-bold ${ratingColor}`}>
                  Rating: {worker.safetyRating}
                </div>
              </div>

              {/* Stats Breakdown */}
              <div className="py-4 space-y-3.5">
                {/* Compliance rate */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Compliance Rate</span>
                    <span className="font-mono font-bold text-slate-800">{worker.complianceRate}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
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
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-slate-400 block uppercase font-bold tracking-wider text-[8px] mb-0.5">Total Violations</span>
                    <span className="font-mono font-bold text-slate-800">{worker.totalViolations}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-slate-400 block uppercase font-bold tracking-wider text-[8px] mb-0.5">Avg Response</span>
                    <span className="font-mono font-bold text-slate-800">{worker.avgResponseTime}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-slate-400 block uppercase font-bold tracking-wider text-[8px] mb-0.5">Most Missed PPE</span>
                    <span className="font-mono font-bold text-slate-800 truncate block">{worker.mostMissedPpe}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-slate-400 block uppercase font-bold tracking-wider text-[8px] mb-0.5">Risk Trend</span>
                    <span className={`font-semibold ${
                      worker.riskTrend === 'Increasing' ? 'text-red-600' : worker.riskTrend === 'Excellent' ? 'text-emerald-605' : 'text-slate-700'
                    }`}>{worker.riskTrend}</span>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="pt-3 border-t border-slate-200 bg-slate-50 -mx-5 -mb-5 p-5 rounded-b-2xl shadow-inner">
                <div className="flex gap-2 items-start text-[10px]">
                  <GraduationCap className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 uppercase font-bold tracking-wider block">Training Action Plan</span>
                    <p className="text-slate-600 leading-relaxed font-light mt-0.5">{worker.trainingRecommendation}</p>
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
