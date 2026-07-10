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
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow space-y-4 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Historical Incident Records</h2>
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search log..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-805 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 w-44"
                />
              </div>
              {/* Severity Dropdown */}
              <div className="flex items-center gap-1.5">
                <Filter className="h-3.5 w-3.5 text-slate-400" />
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none"
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
                <tr className="border-b border-slate-200 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-2">Incident ID</th>
                  <th className="py-3 px-2">Worker</th>
                  <th className="py-3 px-2">Time / Location</th>
                  <th className="py-3 px-2">Missing PPE</th>
                  <th className="py-3 px-2">Duration</th>
                  <th className="py-3 px-2">Severity</th>
                  <th className="py-3 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredIncidents.map((inc) => {
                  const isSelected = selectedIncidentId === inc.id;
                  let sevColor = 'text-red-700 bg-red-50 border border-red-200';
                  if (inc.severity === 'Warning') sevColor = 'text-amber-700 bg-amber-50 border border-amber-200';

                  return (
                    <tr
                      key={inc.id}
                      onClick={() => setSelectedIncidentId(inc.id)}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors text-xs ${
                        isSelected ? 'bg-blue-50/40 border-l-4 border-blue-600 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3 px-2 font-mono font-bold text-slate-800">{inc.id}</td>
                      <td className="py-3 px-2">
                        <div className="font-semibold text-slate-800">{inc.workerName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{inc.workerId}</div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="text-slate-800 font-medium">{inc.location}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{inc.time}</div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-red-600 font-medium font-mono">{inc.missingPpe}</span>
                      </td>
                      <td className="py-3 px-2 font-mono text-slate-600">{inc.duration}</td>
                      <td className="py-3 px-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${sevColor}`}>
                          {inc.severity}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                        {inc.status === 'Pending' ? (
                          <button 
                            onClick={() => handleAcknowledge(inc.id)}
                            className="px-2 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded text-[10px] font-bold text-amber-700 transition-colors"
                          >
                            Acknowledge
                          </button>
                        ) : inc.status === 'Acknowledged' ? (
                          <button 
                            onClick={() => handleResolve(inc.id)}
                            className="px-2 py-1 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-200 rounded text-[10px] font-bold text-blue-600 transition-colors"
                          >
                            Mark Resolved
                          </button>
                        ) : (
                          <span className="text-emerald-600 text-[10px] font-bold flex items-center justify-center gap-1">
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
              <div className="py-8 text-center text-slate-400 text-xs">
                No incidents match the search criteria.
              </div>
            )}
          </div>
        </div>

        {/* AI Investigation Details Panel */}
        <div className="xl:col-span-1 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between animate-fade-in">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200">
              <BrainCircuit className="h-4 w-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">AI Investigation Audit</h2>
            </div>

            {/* Target Header */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-1">Target Audit Record</span>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-800">
                <span>{selectedIncident.id}</span>
                <span className="text-slate-500 font-light">{selectedIncident.workerName} ({selectedIncident.workerId})</span>
              </div>
              <div className="text-[10px] text-slate-500 font-light mt-1">
                Timestamp: {selectedIncident.date} | {selectedIncident.time} ({selectedIncident.location})
              </div>
            </div>

            {/* Root Causes Grid */}
            <div className="space-y-3.5">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">AI Root Cause Assessment</span>
              
              {selectedIncident.rootCauses.map((cause, index) => (
                <div key={index} className="space-y-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex justify-between items-start gap-1">
                    <span className="text-xs font-bold text-slate-850 leading-tight">{cause.reason}</span>
                    <span className="text-xs font-mono font-bold text-blue-600 shrink-0">{cause.confidence}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        cause.confidence > 50 ? 'bg-red-500' : cause.confidence > 20 ? 'bg-amber-500' : 'bg-blue-500'
                      }`} 
                      style={{ width: `${cause.confidence}%` }}
                    ></div>
                  </div>

                  <div className="text-[10px] text-slate-500 leading-relaxed pt-1">
                    <div><strong className="text-slate-650 font-semibold">Evidence:</strong> {cause.evidence}</div>
                    <div className="mt-0.5"><strong className="text-slate-650 font-semibold">Diagnosis:</strong> {cause.explanation}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold">Diagnosis Engine: v4.2</span>
            <button 
              onClick={() => alert(`Generating detailed EHS report PDF for ${selectedIncident.id}...`)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-650 font-bold rounded-xl text-[11px] transition-colors shadow-sm"
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
