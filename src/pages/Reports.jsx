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
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 font-sans">Reports & Safety Audits</h1>
        <p className="text-sm text-slate-500 font-light">Generate, schedule, and export regulatory OSHA safety logs and plant shift reports.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Report Configuration Panel */}
        <div className="xl:col-span-1 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200">
            <BarChart2 className="h-4 w-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Configure Audit Report</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-500 block font-semibold mb-1">Report Scope / Type</label>
              <select 
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:bg-white"
              >
                <option value="Daily">Daily Incident Summary</option>
                <option value="Weekly">Weekly EHS Compliance Audit</option>
                <option value="Monthly">Monthly Plant safety performance</option>
                <option value="Shift">Shift comparison metrics</option>
              </select>
            </div>

            <div>
              <label className="text-slate-500 block font-semibold mb-1">Date Range</label>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:bg-white"
              >
                <option value="Today">Today (Last 24 Hours)</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="Custom">Custom Date Range...</option>
              </select>
            </div>

            <div>
              <label className="text-slate-500 block font-semibold mb-1">Target Production Zones</label>
              <div className="grid grid-cols-2 gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                {['Assembly', 'Paint Shop', 'Welding', 'Machine Shop', 'Warehouse'].map((zone) => (
                  <label key={zone} className="flex items-center gap-2 text-slate-600 cursor-pointer font-medium">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 focus:ring-blue-500" />
                    <span>{zone}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3">
            <button
              onClick={() => handleExport('PDF', `${reportType} Report`)}
              className="py-2.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl text-xs font-bold text-red-700 flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <FileText className="h-3.5 w-3.5" />
              Export PDF
            </button>
            <button
              onClick={() => handleExport('Excel', `${reportType} Report`)}
              className="py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700 flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Download className="h-3.5 w-3.5" />
              Export Excel
            </button>
          </div>
        </div>

        {/* Generated Reports List */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Report Repository</h2>
            <span className="text-[10px] text-slate-400 font-mono">4 historical logs</span>
          </div>

          <div className="space-y-3.5">
            {reports.map((rep) => (
              <div key={rep.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl border ${
                    rep.format === 'PDF' ? 'bg-red-50 text-red-750 border-red-200' : 'bg-emerald-50 text-emerald-750 border-emerald-200'
                  }`}>
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">{rep.type}</h3>
                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                      File ID: {rep.id} | Size: {rep.size} | Date: {rep.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Previewing ${rep.id} report...`)}
                    className="p-2 bg-white border border-slate-200 text-slate-650 hover:bg-slate-50 hover:text-slate-800 rounded-xl text-xs transition-colors shadow-sm"
                    title="Preview Report"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleExport(rep.format, rep.type)}
                    className="p-2 bg-blue-600/10 border border-blue-200 text-blue-605 hover:text-blue-800 rounded-xl text-xs transition-colors shadow-sm"
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
