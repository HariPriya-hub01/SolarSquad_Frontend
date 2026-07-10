import React, { useState } from 'react';
import { Brain, Cpu, ShieldCheck, ShieldAlert, GitFork, ArrowDown, UserCheck, AlertTriangle } from 'lucide-react';
import { CONTEXT_INTELLIGENCE } from '../data/mockData';

export default function ContextIntelligence() {
  const [selectedWorkerId, setSelectedWorkerId] = useState(CONTEXT_INTELLIGENCE[0].workerId);

  const activeContext = CONTEXT_INTELLIGENCE.find(c => c.workerId === selectedWorkerId) || CONTEXT_INTELLIGENCE[0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 font-sans">Context Intelligence</h1>
        <p className="text-sm text-slate-500 font-light">Context-aware computer vision networks that adjust safety checks depending on active task, zone, and employee authorization permissions.</p>
      </div>

      {/* Selector */}
      <div className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm animate-fade-in">
        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Select Active Context Profile:</span>
        <div className="flex gap-2">
          {CONTEXT_INTELLIGENCE.map((profile) => (
            <button
              key={profile.workerId}
              onClick={() => setSelectedWorkerId(profile.workerId)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                selectedWorkerId === profile.workerId
                  ? 'bg-blue-600/10 border-blue-500/30 text-blue-600 font-bold'
                  : 'bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              {profile.name} ({profile.role})
            </button>
          ))}
        </div>
      </div>

      {/* Grid split */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Left Side: Context Details */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between animate-fade-in">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200">
              <Brain className="h-4 w-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">EHS Context Profile</h2>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider mb-0.5">Worker Name</span>
                <span className="text-sm font-semibold text-slate-800">{activeContext.name}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider mb-0.5">Worker ID / Role</span>
                <span className="text-sm font-semibold text-slate-800">{activeContext.workerId} ({activeContext.role})</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider mb-0.5">Assigned Task</span>
                <span className="text-sm font-semibold text-slate-800">{activeContext.assignedTask}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider mb-0.5">Factory Zone</span>
                <span className="text-sm font-semibold text-slate-800">{activeContext.zone}</span>
              </div>
            </div>

            {/* PPE Checks */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Context-Based PPE Compliance Checklist</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                
                {/* Required */}
                <div className="space-y-1">
                  <span className="text-slate-500 font-semibold block border-b border-slate-200 pb-1 uppercase text-[9px] tracking-wide">Required PPE</span>
                  {activeContext.requiredPPE.map((ppe, i) => (
                    <div key={i} className="text-slate-800 font-mono">• {ppe}</div>
                  ))}
                </div>

                {/* Detected */}
                <div className="space-y-1">
                  <span className="text-emerald-600 font-semibold block border-b border-slate-200 pb-1 uppercase text-[9px] tracking-wide">Detected PPE</span>
                  {activeContext.detectedPPE.length === 0 ? (
                    <div className="text-slate-400 font-mono italic">None detected</div>
                  ) : (
                    activeContext.detectedPPE.map((ppe, i) => (
                      <div key={i} className="text-emerald-600 font-mono flex items-center gap-1">✔ {ppe}</div>
                    ))
                  )}
                </div>

                {/* Missing */}
                <div className="space-y-1">
                  <span className="text-red-650 font-semibold block border-b border-slate-200 pb-1 uppercase text-[9px] tracking-wide">Missing PPE</span>
                  {activeContext.missingPPE.length === 0 ? (
                    <div className="text-emerald-600 font-mono flex items-center gap-1">✔ None</div>
                  ) : (
                    activeContext.missingPPE.map((ppe, i) => (
                      <div key={i} className="text-red-650 font-mono flex items-center gap-1">✖ {ppe}</div>
                    ))
                  )}
                </div>

              </div>
            </div>

            {/* Assessment Verdict */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wide">AI Classification Verdict</span>
                <p className="text-[11px] text-slate-600 leading-relaxed max-w-sm mt-1 font-light">{activeContext.aiExplanation}</p>
              </div>
              <div className="text-center p-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-[9px] text-slate-450 font-bold uppercase tracking-wider block">Risk Score</span>
                <span className={`text-2xl font-bold font-mono ${
                  activeContext.riskScore > 50 ? 'text-red-600' : 'text-emerald-605'
                }`}>{activeContext.riskScore}</span>
                <span className={`text-[8px] font-bold block uppercase tracking-widest mt-0.5 ${
                  activeContext.classification === 'Critical' ? 'text-red-600 animate-pulse' : 'text-emerald-600'
                }`}>{activeContext.classification}</span>
              </div>
            </div>

          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-200 flex justify-between text-xs text-slate-400 font-mono">
            <span>Model node: NODE-CTX-49</span>
            <span>Refreshed: Live</span>
          </div>
        </div>

        {/* Right Side: Context Decision Tree */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between animate-fade-in">
          <div>
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200 mb-4">
              <GitFork className="h-4 w-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Context Decision Tree</h2>
            </div>

            {/* Tree Flow Representation */}
            <div className="space-y-4 flex flex-col items-center py-2 text-center text-xs">
              
              {/* Layer 1 */}
              <div className="w-full max-w-xs p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors shadow-sm">
                <span className="text-[9px] text-slate-450 font-bold uppercase block tracking-wider mb-0.5">Input Layer 1: {activeContext.decisionTree.step1.node}</span>
                <span className="font-semibold text-slate-800">{activeContext.decisionTree.step1.output}</span>
              </div>

              <ArrowDown className="h-4 w-4 text-blue-605 animate-bounce" />

              {/* Layer 2 */}
              <div className="w-full max-w-xs p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors shadow-sm">
                <span className="text-[9px] text-slate-450 font-bold uppercase block tracking-wider mb-0.5">Filter Layer 2: {activeContext.decisionTree.step2.node}</span>
                <span className="font-semibold text-slate-800">{activeContext.decisionTree.step2.output}</span>
              </div>

              <ArrowDown className="h-4 w-4 text-blue-605 animate-bounce" />

              {/* Layer 3 */}
              <div className="w-full max-w-xs p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors shadow-sm">
                <span className="text-[9px] text-slate-450 font-bold uppercase block tracking-wider mb-0.5">Context Layer 3: {activeContext.decisionTree.step3.node}</span>
                <span className="font-semibold text-slate-800">{activeContext.decisionTree.step3.output}</span>
              </div>

              <ArrowDown className="h-4 w-4 text-blue-605 animate-bounce" />

              {/* Layer 4 */}
              <div className={`w-full max-w-xs p-3 border rounded-xl hover:border-slate-300 transition-colors shadow-sm ${
                activeContext.riskScore > 50 
                  ? 'bg-red-50 border-red-200 text-red-700' 
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}>
                <span className="text-[9px] text-slate-450 font-bold uppercase block tracking-wider mb-0.5">Verdict Layer 4: {activeContext.decisionTree.step4.node}</span>
                <span className="font-bold">{activeContext.decisionTree.step4.output}</span>
              </div>

            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-200 text-center text-[10px] text-slate-400">
            Node-decision paths are verified against local OSHA regulation compliance codes.
          </div>
        </div>

      </div>
    </div>
  );
}
