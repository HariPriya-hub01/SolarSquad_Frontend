import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Video, 
  ShieldAlert, 
  Brain, 
  TrendingUp, 
  GitFork, 
  Users, 
  Lightbulb, 
  FileSpreadsheet, 
  Camera, 
  Layers, 
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'live', label: 'Live Monitoring', icon: Video },
  { id: 'incidents', label: 'AI Incident Analysis', icon: ShieldAlert },
  { id: 'context', label: 'Context Intelligence', icon: Brain },
  { id: 'prediction', label: 'Prediction Center', icon: TrendingUp },
  { id: 'rootcause', label: 'Root Cause Analytics', icon: GitFork },
  { id: 'workers', label: 'Worker Insights', icon: Users },
  { id: 'recommendations', label: 'Smart Recommendations', icon: Lightbulb },
  { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
  { id: 'cameras', label: 'Camera Management', icon: Camera },
  { id: 'zones', label: 'Zone Management', icon: Layers },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`flex flex-col h-screen bg-[#070b13] border-r border-[#1e293b] text-gray-400 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'} shrink-0 sticky top-0 overflow-y-auto`}>
      {/* Brand Header */}
      <div className="flex items-center justify-between p-5 border-b border-[#1e293b] min-h-[72px]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600/10 text-blue-500 border border-blue-500/20">
            <ShieldCheck className="h-6 w-6 animate-pulse" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-white tracking-wide uppercase">SolarSquad</h1>
              <span className="text-[10px] text-blue-400 tracking-widest font-semibold uppercase">AI Safety Intelligence</span>
            </div>
          )}
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-slate-800 text-gray-400 hover:text-white transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-blue-600/10 text-blue-400 border-l-4 border-blue-500 shadow-[inset_0_0_12px_rgba(59,130,246,0.15)] font-semibold' 
                  : 'hover:bg-slate-900/60 hover:text-slate-200 border-l-4 border-transparent'
              }`}
            >
              <Icon className={`h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-slate-300'}`} />
              
              {!isCollapsed && (
                <span className="truncate">{item.label}</span>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-950 text-white text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 border border-slate-800 whitespace-nowrap shadow-xl">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footnote */}
      {!isCollapsed && (
        <div className="p-5 border-t border-[#1e293b] bg-slate-950/20 text-center">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Detroit Plant #4 Online</span>
          </div>
          <span className="text-[9px] text-gray-600 block font-mono">v2.4.0-production</span>
        </div>
      )}
    </aside>
  );
}
