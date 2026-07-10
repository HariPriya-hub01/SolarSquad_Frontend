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

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`flex flex-col h-screen bg-white border-r border-slate-200 text-slate-500 transition-all duration-300 
        fixed md:sticky top-0 left-0 z-50 
        ${isCollapsed ? 'w-20' : 'w-72'} 
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
        shrink-0 overflow-y-auto`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 min-h-[72px]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600/10 text-blue-600 border border-blue-500/20">
              <ShieldCheck className="h-6 w-6 animate-pulse" />
            </div>
            <div className={`${isCollapsed ? 'md:hidden' : 'block'}`}>
              <h1 className="text-lg font-bold text-slate-800 tracking-wide uppercase">SolarSquad</h1>
              <span className="text-[10px] text-blue-600 tracking-widest font-semibold uppercase">AI Safety Intelligence</span>
            </div>
          </div>
          <button 
            onClick={() => {
              if (isOpen) {
                setIsOpen(false);
              } else {
                setIsCollapsed(!isCollapsed);
              }
            }}
            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <span className="md:hidden">
              <ChevronLeft className="h-5 w-5" />
            </span>
            <span className="hidden md:block">
              {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </span>
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
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false); // Close sidebar overlay on mobile tap
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-600 border-l-4 border-blue-500 font-semibold shadow-[inset_0_0_12px_rgba(59,130,246,0.06)]' 
                    : 'hover:bg-slate-50 hover:text-slate-800 border-l-4 border-transparent'
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
                
                <span className={`truncate ${isCollapsed ? 'md:hidden' : 'block'}`}>{item.label}</span>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-3 py-1.5 bg-white text-slate-800 text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 border border-slate-200 whitespace-nowrap shadow-xl hidden md:block">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footnote */}
        <div className={`p-5 border-t border-slate-200 bg-slate-50 text-center shrink-0 ${isCollapsed ? 'md:hidden' : 'block'}`}>
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Detroit Plant #4 Online</span>
          </div>
          <span className="text-[9px] text-slate-400 block font-mono">v2.4.0-production</span>
        </div>
      </aside>
    </>
  );
}
