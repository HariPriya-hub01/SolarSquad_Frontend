import React, { useState } from 'react';
import { ShieldAlert, FileText, CheckCircle, Search, Calendar, Filter, BrainCircuit, Activity, Sliders } from 'lucide-react';
import { INCIDENTS } from '../data/mockData';

export default function IncidentAnalysis() {
  const [incidents, setIncidents] = useState(INCIDENTS);
  const [selectedIncidentId, setSelectedIncidentId] = useState(INCIDENTS[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('All');

  const selectedIncident = incidents.find(inc => inc.id === selectedIncidentId) || incidents[0];

  const handleAcknowledge = (id) => {
    alert(`Incident ${id} has been acknowledged and routed to EHS Shift Supervisor.`);
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status: 'Acknowledged' } : inc));
  };

  const handleResolve = (id) => {
    alert(`Incident ${id} marked as RESOLVED. Root cause filed, worker notification sent.`);
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status: 'Resolved' } : inc));
  };

  const filteredIncidents = incidents.filter(inc => {
    const matchesSearch = inc.workerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inc.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'All' || inc.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">AI Incident Analysis</h1>
        <p className="text-sm text-slate-400">Post-event diagnostics and incident investigations powered by computer vision telemetry logs.</p>
      </div>

      {/* Filters and List */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Incident Table Log Panel */}
        <div className="xl:col-span-2 bg-[#111827] border border-slate-850 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-850 pb-3">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Historical Incident Records</h2>
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search log..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500 w-44"
                />
              </div>
              {/* Severity Dropdown */}
              <div className="flex items-center gap-1.5">
                <Filter className="h-3.5 w-3.5 text-slate-500" />
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none"
                >
                  <option value="All">All Severity</option>
                  <option value="Critical">Critical</option>
                  <option value="Warning">Warning</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-850 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-2">Incident ID</th>
                  <th className="py-3 px-2">Worker</th>
                  <th className="py-3 px-2">Time / Location</th>
                  <th className="py-3 px-2">Missing PPE</th>
                  <th className="py-3 px-2">Duration</th>
                  <th className="py-3 px-2">Severity</th>
                  <th className="py-3 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {filteredIncidents.map((inc) => {
                  const isSelected = selectedIncidentId === inc.id;
                  let sevColor = 'text-red-400 bg-red-400/10 border-red-500/20';
                  if (inc.severity === 'Warning') sevColor = 'text-amber-400 bg-amber-400/10 border-amber-500/20';

                  return (
                    <tr
                      key={inc.id}
                      onClick={() => setSelectedIncidentId(inc.id)}
                      className={`hover:bg-slate-900/40 cursor-pointer transition-colors text-xs ${
                        isSelected ? 'bg-slate-900/80 border-l-2 border-blue-500 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3 px-2 font-mono font-bold text-slate-300">{inc.id}</td>
                      <td className="py-3 px-2">
                        <div className="font-semibold text-slate-205">{inc.workerName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{inc.workerId}</div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="text-slate-300 font-medium">{inc.location}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{inc.time}</div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-red-400 font-medium font-mono">{inc.missingPpe}</span>
                      </td>
                      <td className="py-3 px-2 font-mono text-slate-400">{inc.duration}</td>
                      <td className="py-3 px-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${sevColor}`}>
                          {inc.severity}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                        {inc.status === 'Pending' ? (
                          <button 
                            onClick={() => handleAcknowledge(inc.id)}
                            className="px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded text-[10px] font-bold text-amber-400 transition-colors"
                          >
                            Acknowledge
                          </button>
                        ) : inc.status === 'Acknowledged' ? (
                          <button 
                            onClick={() => handleResolve(inc.id)}
                            className="px-2 py-1 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 rounded text-[10px] font-bold text-blue-400 transition-colors"
                          >
                            Mark Resolved
                          </button>
                        ) : (
                          <span className="text-emerald-400 text-[10px] font-bold flex items-center justify-center gap-1">
                            <CheckCircle className="h-3.5 w-3.5" /> Resolved
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredIncidents.length === 0 && (
              <div className="py-8 text-center text-slate-500 text-xs">
                No incidents match the search criteria.
              </div>
            )}
          </div>
        </div>

        {/* AI Investigation Details Panel */}
        <div className="xl:col-span-1 bg-[#111827] border border-slate-850 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-850">
              <BrainCircuit className="h-4 w-4 text-blue-400" />
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">AI Investigation Audit</h2>
            </div>

            {/* Target Header */}
            <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-xl">
              <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider mb-1">Target Audit Record</span>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-200">
                <span>{selectedIncident.id}</span>
                <span className="text-slate-450 font-light">{selectedIncident.workerName} ({selectedIncident.workerId})</span>
              </div>
              <div className="text-[10px] text-slate-450 font-light mt-1">
                Timestamp: {selectedIncident.date} | {selectedIncident.time} ({selectedIncident.location})
              </div>
            </div>

            {/* Root Causes Grid */}
            <div className="space-y-3.5">
              <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">AI Root Cause Assessment</span>
              
              {selectedIncident.rootCauses.map((cause, index) => (
                <div key={index} className="space-y-1.5 p-3 bg-slate-950/40 border border-slate-850 rounded-xl">
                  <div className="flex justify-between items-start gap-1">
                    <span className="text-xs font-bold text-slate-250 leading-tight">{cause.reason}</span>
                    <span className="text-xs font-mono font-bold text-blue-400 shrink-0">{cause.confidence}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        cause.confidence > 50 ? 'bg-red-500' : cause.confidence > 20 ? 'bg-amber-500' : 'bg-blue-500'
                      }`} 
                      style={{ width: `${cause.confidence}%` }}
                    ></div>
                  </div>

                  <div className="text-[10px] text-slate-450 leading-relaxed pt-1">
                    <div><strong className="text-slate-400 font-semibold">Evidence:</strong> {cause.evidence}</div>
                    <div className="mt-0.5"><strong className="text-slate-400 font-semibold">Diagnosis:</strong> {cause.explanation}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-850 flex items-center justify-between text-xs">
            <span className="text-slate-550 font-semibold">Diagnosis Engine: v4.2</span>
            <button 
              onClick={() => alert(`Generating detailed EHS report PDF for ${selectedIncident.id}...`)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold rounded-xl text-[11px] transition-colors"
            >
              <FileText className="h-3.5 w-3.5" />
              Download Audit PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
