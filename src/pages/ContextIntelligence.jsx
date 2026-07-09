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
        <h1 className="text-2xl font-bold tracking-tight text-white font-sans">Context Intelligence</h1>
        <p className="text-sm text-slate-400">Context-aware computer vision networks that adjust safety checks depending on active task, zone, and employee authorization permissions.</p>
      </div>

      {/* Selector */}
      <div className="flex items-center gap-3 p-4 bg-slate-900 border border-slate-850 rounded-2xl">
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Select Active Context Profile:</span>
        <div className="flex gap-2">
          {CONTEXT_INTELLIGENCE.map((profile) => (
            <button
              key={profile.workerId}
              onClick={() => setSelectedWorkerId(profile.workerId)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                selectedWorkerId === profile.workerId
                  ? 'bg-blue-600/10 border-blue-500/35 text-blue-400'
                  : 'bg-slate-950/60 border-slate-850 text-slate-400 hover:text-slate-200'
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
        <div className="bg-[#111827] border border-slate-850 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2.5 border-b border-[#1e293b]">
              <Brain className="h-4 w-4 text-blue-400" />
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">EHS Context Profile</h2>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-950/50 border border-slate-850 rounded-xl">
                <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider mb-0.5">Worker Name</span>
                <span className="text-sm font-semibold text-slate-200">{activeContext.name}</span>
              </div>
              <div className="p-3 bg-slate-950/50 border border-slate-850 rounded-xl">
                <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider mb-0.5">Worker ID / Role</span>
                <span className="text-sm font-semibold text-slate-200">{activeContext.workerId} ({activeContext.role})</span>
              </div>
              <div className="p-3 bg-slate-950/50 border border-slate-850 rounded-xl">
                <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider mb-0.5">Assigned Task</span>
                <span className="text-sm font-semibold text-slate-200">{activeContext.assignedTask}</span>
              </div>
              <div className="p-3 bg-slate-950/50 border border-slate-850 rounded-xl">
                <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider mb-0.5">Factory Zone</span>
                <span className="text-sm font-semibold text-slate-200">{activeContext.zone}</span>
              </div>
            </div>

            {/* PPE Checks */}
            <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl space-y-3">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Context-Based PPE Compliance Checklist</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                
                {/* Required */}
                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold block border-b border-slate-900 pb-1 uppercase text-[9px] tracking-wide">Required PPE</span>
                  {activeContext.requiredPPE.map((ppe, i) => (
                    <div key={i} className="text-slate-200 font-mono">• {ppe}</div>
                  ))}
                </div>

                {/* Detected */}
                <div className="space-y-1">
                  <span className="text-emerald-400 font-semibold block border-b border-slate-900 pb-1 uppercase text-[9px] tracking-wide">Detected PPE</span>
                  {activeContext.detectedPPE.length === 0 ? (
                    <div className="text-slate-500 font-mono italic">None detected</div>
                  ) : (
                    activeContext.detectedPPE.map((ppe, i) => (
                      <div key={i} className="text-emerald-400 font-mono flex items-center gap-1">✔ {ppe}</div>
                    ))
                  )}
                </div>

                {/* Missing */}
                <div className="space-y-1">
                  <span className="text-red-400 font-semibold block border-b border-slate-900 pb-1 uppercase text-[9px] tracking-wide">Missing PPE</span>
                  {activeContext.missingPPE.length === 0 ? (
                    <div className="text-emerald-400 font-mono flex items-center gap-1">✔ None</div>
                  ) : (
                    activeContext.missingPPE.map((ppe, i) => (
                      <div key={i} className="text-red-400 font-mono flex items-center gap-1">✖ {ppe}</div>
                    ))
                  )}
                </div>

              </div>
            </div>

            {/* Assessment Verdict */}
            <div className="p-3 bg-slate-950/20 border border-slate-850 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block tracking-wide">AI Classification Verdict</span>
                <p className="text-[11px] text-slate-350 leading-relaxed max-w-sm mt-1">{activeContext.aiExplanation}</p>
              </div>
              <div className="text-center p-3 rounded-2xl bg-slate-950 border border-slate-850">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Risk Score</span>
                <span className={`text-2xl font-bold font-mono ${
                  activeContext.riskScore > 50 ? 'text-red-500' : 'text-emerald-400'
                }`}>{activeContext.riskScore}</span>
                <span className={`text-[8px] font-bold block uppercase tracking-widest mt-0.5 ${
                  activeContext.classification === 'Critical' ? 'text-red-500 animate-pulse' : 'text-emerald-400'
                }`}>{activeContext.classification}</span>
              </div>
            </div>

          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-850 flex justify-between text-xs text-slate-500 font-mono">
            <span>Model node: NODE-CTX-49</span>
            <span>Refreshed: Live</span>
          </div>
        </div>

        {/* Right Side: Context Decision Tree */}
        <div className="bg-[#111827] border border-slate-850 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-2.5 border-b border-[#1e293b] mb-4">
              <GitFork className="h-4 w-4 text-blue-400" />
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Context Decision Tree</h2>
            </div>

            {/* Tree Flow Representation */}
            <div className="space-y-4 flex flex-col items-center py-2 text-center text-xs">
              
              {/* Layer 1 */}
              <div className="w-full max-w-xs p-3 bg-slate-950/60 border border-slate-850 rounded-xl hover:border-slate-800 transition-colors shadow">
                <span className="text-[9px] text-slate-500 font-bold uppercase block tracking-wider mb-0.5">Input Layer 1: {activeContext.decisionTree.step1.node}</span>
                <span className="font-semibold text-slate-200">{activeContext.decisionTree.step1.output}</span>
              </div>

              <ArrowDown className="h-4 w-4 text-blue-500 animate-bounce" />

              {/* Layer 2 */}
              <div className="w-full max-w-xs p-3 bg-slate-950/60 border border-slate-850 rounded-xl hover:border-slate-800 transition-colors shadow">
                <span className="text-[9px] text-slate-500 font-bold uppercase block tracking-wider mb-0.5">Filter Layer 2: {activeContext.decisionTree.step2.node}</span>
                <span className="font-semibold text-slate-200">{activeContext.decisionTree.step2.output}</span>
              </div>

              <ArrowDown className="h-4 w-4 text-blue-500 animate-bounce" />

              {/* Layer 3 */}
              <div className="w-full max-w-xs p-3 bg-slate-950/60 border border-slate-850 rounded-xl hover:border-slate-800 transition-colors shadow">
                <span className="text-[9px] text-slate-500 font-bold uppercase block tracking-wider mb-0.5">Context Layer 3: {activeContext.decisionTree.step3.node}</span>
                <span className="font-semibold text-slate-200">{activeContext.decisionTree.step3.output}</span>
              </div>

              <ArrowDown className="h-4 w-4 text-blue-500 animate-bounce" />

              {/* Layer 4 */}
              <div className={`w-full max-w-xs p-3 border rounded-xl hover:border-slate-800 transition-colors shadow ${
                activeContext.riskScore > 50 
                  ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              }`}>
                <span className="text-[9px] text-slate-500 font-bold uppercase block tracking-wider mb-0.5">Verdict Layer 4: {activeContext.decisionTree.step4.node}</span>
                <span className="font-bold">{activeContext.decisionTree.step4.output}</span>
              </div>

            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-850 text-center text-[10px] text-slate-500">
            Node-decision paths are verified against local OSHA regulation compliance codes.
          </div>
        </div>

      </div>
    </div>
  );
}
