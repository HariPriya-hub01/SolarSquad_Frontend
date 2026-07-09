import React, { useState } from 'react';
import { FileText, Download, Calendar, Users, Eye, BarChart2 } from 'lucide-react';

const mockReports = [
  { id: 'REP-2026-07-09', type: 'Daily EHS Safety Summary', date: '2026-07-09', size: '2.4 MB', format: 'PDF', author: 'AI Engine v4.2' },
  { id: 'REP-2026-W27', type: 'Weekly Plant Compliance Audit', date: '2026-07-05', size: '12.8 MB', format: 'PDF', author: 'EHS Manager' },
  { id: 'REP-2026-M06', type: 'Monthly Safety Performance Assessment', date: '2026-06-30', size: '45.1 MB', format: 'Excel', author: 'SolarSquad Analytics' },
  { id: 'REP-SHIFT-COMP', type: 'Shift Performance Comparison (A vs B vs C)', date: '2026-07-08', size: '4.1 MB', format: 'PDF', author: 'EHS Manager' }
];

export default function Reports() {
  const [reports, setReports] = useState(mockReports);
  const [reportType, setReportType] = useState('Daily');
  const [dateRange, setDateRange] = useState('Today');

  const handleExport = (format, type) => {
    alert(`Compiling EHS Safety telemetry logs. Exporting "${type}" as ${format}... File download will begin shortly.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white font-sans">Reports & Safety Audits</h1>
        <p className="text-sm text-slate-400">Generate, schedule, and export regulatory OSHA safety logs and plant shift reports.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Report Configuration Panel */}
        <div className="xl:col-span-1 bg-[#111827] border border-slate-850 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-2.5 border-b border-[#1e293b]">
            <BarChart2 className="h-4 w-4 text-blue-400" />
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Configure Audit Report</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block font-semibold mb-1">Report Scope / Type</label>
              <select 
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 focus:outline-none"
              >
                <option value="Daily">Daily Incident Summary</option>
                <option value="Weekly">Weekly EHS Compliance Audit</option>
                <option value="Monthly">Monthly Plant safety performance</option>
                <option value="Shift">Shift comparison metrics</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block font-semibold mb-1">Date Range</label>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-850 rounded-xl text-slate-200 focus:outline-none"
              >
                <option value="Today">Today (Last 24 Hours)</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="Custom">Custom Date Range...</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block font-semibold mb-1">Target Production Zones</label>
              <div className="grid grid-cols-2 gap-2 p-2 bg-slate-950/60 border border-slate-850 rounded-xl">
                {['Assembly', 'Paint Shop', 'Welding', 'Machine Shop', 'Warehouse'].map((zone) => (
                  <label key={zone} className="flex items-center gap-2 text-slate-350 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-slate-800 focus:ring-blue-500" />
                    <span>{zone}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3">
            <button
              onClick={() => handleExport('PDF', `${reportType} Report`)}
              className="py-2.5 bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 rounded-xl text-xs font-bold text-red-400 flex items-center justify-center gap-1.5 transition-all"
            >
              <FileText className="h-3.5 w-3.5" />
              Export PDF
            </button>
            <button
              onClick={() => handleExport('Excel', `${reportType} Report`)}
              className="py-2.5 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 rounded-xl text-xs font-bold text-emerald-400 flex items-center justify-center gap-1.5 transition-all"
            >
              <Download className="h-3.5 w-3.5" />
              Export Excel
            </button>
          </div>
        </div>

        {/* Generated Reports List */}
        <div className="xl:col-span-2 bg-[#111827] border border-slate-850 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#1e293b]">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Report Repository</h2>
            <span className="text-[10px] text-slate-500 font-mono">4 historical logs</span>
          </div>

          <div className="space-y-3.5">
            {reports.map((rep) => (
              <div key={rep.id} className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl hover:border-slate-800 transition-all flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl border ${
                    rep.format === 'PDF' ? 'bg-red-500/10 text-red-400 border-red-500/10' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10'
                  }`}>
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200">{rep.type}</h3>
                    <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                      File ID: {rep.id} | Size: {rep.size} | Date: {rep.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Previewing ${rep.id} report...`)}
                    className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-xs transition-colors"
                    title="Preview Report"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleExport(rep.format, rep.type)}
                    className="p-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:text-blue-300 rounded-xl text-xs transition-colors"
                    title="Download Report"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
