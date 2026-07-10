import React from 'react';
import { GitFork, AlertTriangle, Lightbulb, TrendingUp, Info } from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { ROOT_CAUSES } from '../data/mockData';

export default function RootCauseAnalytics() {
  
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 font-sans">Root Cause Analytics</h1>
        <p className="text-sm text-slate-500 font-light">Statistical breakdown of the underlying factors prompting safety infractions across all production zones.</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Pie Chart: Root Causes */}
        <div className="xl:col-span-1 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200">
            <GitFork className="h-4 w-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Root Causes Distribution</h2>
          </div>
          
          <div className="h-64 flex flex-col justify-between items-center">
            <div className="w-full h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ROOT_CAUSES.pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {ROOT_CAUSES.pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color === '#ef4444' ? '#dc2626' : entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full pt-2">
              {ROOT_CAUSES.pieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1.5 text-[10px]">
                  <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: entry.color === '#ef4444' ? '#dc2626' : entry.color }}></span>
                  <span className="text-slate-500 truncate max-w-[80px]">{entry.name}</span>
                  <span className="font-mono text-slate-800 font-bold ml-auto">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trend Graph: Root Causes over last 30 days */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between animate-fade-in">
          <div>
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Historical Trend (30 Days)</h2>
            </div>

            <div className="h-64 pt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ROOT_CAUSES.trendData}>
                  <defs>
                    <linearGradient id="colorHeat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorForgot" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Area type="monotone" name="Thermal / Heat Fatigue" dataKey="Heat" stroke="#dc2626" fillOpacity={1} fill="url(#colorHeat)" />
                  <Area type="Forgot Gear" dataKey="Forgot" stroke="#f59e0b" fillOpacity={1} fill="url(#colorForgot)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-mono">
            Aggregated from 124 incident investigation files.
          </div>
        </div>

      </div>

      {/* AI Insights panel */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow animate-fade-in">
        <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200 mb-4">
          <Lightbulb className="h-4 w-4 text-emerald-600" />
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">AI Root Cause Insights & Interventions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ROOT_CAUSES.insights.map((insight) => {
            let indicatorColor = 'border-l-4 border-l-red-500 bg-red-50/50';
            if (insight.type === 'warning') indicatorColor = 'border-l-4 border-l-amber-500 bg-amber-50/50';
            if (insight.type === 'safe') indicatorColor = 'border-l-4 border-l-emerald-500 bg-emerald-50/50';

            return (
              <div key={insight.id} className={`p-4 rounded-xl border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow ${indicatorColor}`}>
                <div>
                  <h3 className="text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                    {insight.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-light">
                    {insight.desc}
                  </p>
                </div>
                <div className="text-[9px] text-slate-400 uppercase font-mono mt-3 text-right">
                  System suggestion logged
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
