import React, { useState, useEffect } from 'react';
import { Search, Bell, Factory, Shield, User, Globe, AlertOctagon, Menu } from 'lucide-react';
import { ALERTS } from '../data/mockData';

export default function TopNavbar({ isSidebarOpen, setIsSidebarOpen }) {
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
    <header className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white/80 border-b border-slate-200 backdrop-blur-md sticky top-0 z-40 h-[72px]">
      {/* Menu Trigger and Search Bar */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 md:hidden transition-colors shrink-0"
          aria-label="Toggle Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="relative w-full max-w-[140px] min-[480px]:max-w-[200px] sm:max-w-md group hidden xs:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search workers, incident IDs, cameras, zones..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-light"
          />
        </div>
      </div>

      {/* Selectors and Info */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Station Selector */}
        <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-100 border border-slate-200 rounded-xl max-w-[100px] sm:max-w-none">
          <Factory className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-500 shrink-0" />
          <select 
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
            className="bg-transparent text-[10px] sm:text-xs text-slate-800 font-semibold focus:outline-none cursor-pointer border-none p-0 pr-4 sm:pr-6 truncate"
          >
            <option className="bg-white text-slate-850" value="Assembly Station">Assembly</option>
            <option className="bg-white text-slate-850" value="Paint Spray Station">Paint Shop</option>
            <option className="bg-white text-slate-850" value="Welding Station">Welding</option>
            <option className="bg-white text-slate-850" value="Machine Station">Machine</option>
            <option className="bg-white text-slate-850" value="Warehouse Station">Warehouse</option>
          </select>
        </div>

        {/* Live Clock / Calendar */}
        <div className="text-right border-l border-slate-200 pl-4 pr-1 hidden md:block">
          <span className="text-sm font-bold text-slate-800 font-mono tracking-wider block">
            {formatTime(time)}
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block">
            {formatDate(time)}
          </span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 sm:p-2.5 rounded-xl border transition-all relative ${
              showNotifications 
                ? 'bg-blue-600/10 text-blue-600 border-blue-500/30' 
                : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-red-500"></span>
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50 glass-panel-heavy">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Active Alerts</h3>
                <span className="text-[10px] bg-red-500/15 text-red-600 px-2 py-0.5 rounded-full font-bold">
                  {ALERTS.filter(a => a.status === 'Pending').length} Alert
                </span>
              </div>
              <div className="space-y-2.5 max-h-60 overflow-y-auto">
                {ALERTS.map((alert) => (
                  <div key={alert.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors">
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        alert.severity === 'Critical' ? 'bg-red-500/10 text-red-600' : 'bg-amber-500/10 text-amber-600'
                      }`}>
                        {alert.severity}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono">{alert.timeAgo}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 truncate">{alert.type}</p>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">{alert.camera}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 border-l border-slate-200 pl-3 sm:pl-5 shrink-0">
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 flex items-center justify-center shadow-sm">
            <div className="h-full w-full bg-white rounded-[10px] flex items-center justify-center">
              <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
            </div>
          </div>
          <div className="hidden lg:block text-left">
            <span className="text-xs font-bold text-slate-800 block">EHS Manager</span>
            <span className="text-[10px] text-slate-400 block font-semibold">Admin Panel</span>
          </div>
        </div>
      </div>
    </header>
  );
}
