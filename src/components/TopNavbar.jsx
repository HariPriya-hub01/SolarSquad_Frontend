import React, { useState, useEffect } from 'react';
import { Search, Bell, Factory, Shield, User, Globe, AlertOctagon } from 'lucide-react';
import { ALERTS } from '../data/mockData';

export default function TopNavbar() {
  const [time, setTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedStation, setSelectedStation] = useState('Welding Station');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' });
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#0b1120]/80 border-b border-[#1e293b] backdrop-blur-md sticky top-0 z-40 h-[72px]">
      {/* Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search workers, incident IDs, cameras, zones..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-light"
          />
        </div>
      </div>

      {/* Selectors and Info */}
      <div className="flex items-center gap-5">
        {/* Station Selector */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/40 border border-slate-850 rounded-xl">
          <Factory className="h-4 w-4 text-slate-400" />
          <select 
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
            className="bg-transparent text-xs text-slate-200 font-semibold focus:outline-none cursor-pointer border-none p-0 pr-6"
          >
            <option className="bg-slate-900" value="Assembly Station">Assembly Station</option>
            <option className="bg-slate-900" value="Paint Spray Station">Paint Spray Station</option>
            <option className="bg-slate-900" value="Welding Station">Welding Station</option>
            <option className="bg-slate-900" value="Machine Station">Machine Station</option>
            <option className="bg-slate-900" value="Warehouse Station">Warehouse Station</option>
          </select>
        </div>

        {/* Live Clock / Calendar */}
        <div className="text-right border-l border-slate-850 pl-5 pr-2 hidden md:block">
          <span className="text-sm font-bold text-slate-100 font-mono tracking-wider block">
            {formatTime(time)}
          </span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block">
            {formatDate(time)}
          </span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2.5 rounded-xl border transition-all relative ${
              showNotifications 
                ? 'bg-blue-600/10 text-blue-400 border-blue-500/30' 
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700'
            }`}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 glass-panel-heavy">
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Active Alerts</h3>
                <span className="text-[10px] bg-red-500/15 text-red-400 px-2 py-0.5 rounded-full font-bold">
                  {ALERTS.filter(a => a.status === 'Pending').length} Action Required
                </span>
              </div>
              <div className="space-y-2.5 max-h-60 overflow-y-auto">
                {ALERTS.map((alert) => (
                  <div key={alert.id} className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-850 hover:bg-slate-950 transition-colors">
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        alert.severity === 'Critical' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {alert.severity}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono">{alert.timeAgo}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-350 truncate">{alert.type}</p>
                    <span className="text-[10px] text-slate-505 block mt-0.5 font-mono text-slate-400">{alert.camera}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 border-l border-slate-850 pl-5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 flex items-center justify-center shadow-lg">
            <div className="h-full w-full bg-[#0b1120] rounded-[10px] flex items-center justify-center">
              <User className="h-4 w-4 text-blue-400" />
            </div>
          </div>
          <div className="hidden lg:block text-left">
            <span className="text-xs font-bold text-slate-200 block">EHS Manager</span>
            <span className="text-[10px] text-slate-500 block font-semibold">Admin Panel</span>
          </div>
        </div>
      </div>
    </header>
  );
}
