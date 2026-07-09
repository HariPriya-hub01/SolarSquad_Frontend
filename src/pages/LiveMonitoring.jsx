import React, { useState, useEffect } from 'react';
import { Camera, Activity, ShieldCheck, ShieldAlert, RefreshCw, Maximize2, Cpu, Eye, Radio, Sparkles } from 'lucide-react';
import { CAMERA_FEEDS } from '../data/mockData';

export default function LiveMonitoring() {
  const [cameras, setCameras] = useState(CAMERA_FEEDS.filter(c => c.id !== 'CAM-05'));
  const [selectedCam, setSelectedCam] = useState(null);
  const [fpsFluctuation, setFpsFluctuation] = useState({});
  const [uptime, setUptime] = useState(0);

  // Fluctuating FPS simulation for industrial visual realism
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(u => u + 1);
      const fluctuations = {};
      cameras.forEach(cam => {
        const offset = (Math.random() - 0.5) * 1.5;
        fluctuations[cam.id] = (cam.fps + offset).toFixed(1);
      });
      setFpsFluctuation(fluctuations);
    }, 1500);
    return () => clearInterval(timer);
  }, [cameras]);

  const handleRestartNode = (camId) => {
    alert(`Restarting AI Inference Edge Node for ${camId}... Please wait 15 seconds.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">Live AI Camera Feeds</h1>
          <p className="text-sm text-slate-400">Multi-stream neural networks processing factory floor safety equipment compliance in real time.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#10b981]/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-semibold">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            4 Active Edge Streams
          </div>
          <button 
            onClick={() => alert('Calibrating all computer vision feeds...')}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-350 hover:bg-slate-800 transition-colors"
          >
            <Cpu className="h-3.5 w-3.5 text-blue-400" />
            Calibrate Models
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cameras.map((cam) => {
          const liveFps = fpsFluctuation[cam.id] || cam.fps;
          const statusColors = cam.status === 'Active' 
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
            : 'bg-red-500/10 text-red-400 border-red-500/20';

          return (
            <div 
              key={cam.id} 
              className="bg-[#111827] border border-slate-850 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-850 hover:shadow-2xl transition-all"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-850">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      <Camera className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-200">{cam.name}</h3>
                      <span className="text-[10px] text-slate-500 font-mono">Location: {cam.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${statusColors}`}>
                      {cam.status}
                    </span>
                    <span className="text-[9px] bg-slate-905 text-slate-400 px-2 py-0.5 border border-slate-850 font-mono rounded">
                      Conf: {cam.confidence}%
                    </span>
                  </div>
                </div>

                <div className="relative aspect-video bg-slate-950 border border-slate-850 rounded-xl overflow-hidden group shadow-inner">
                  {/* Real-time backend MJPEG video feed */}
                  <img 
                    src={`http://localhost:8000/api/cameras/${cam.id}/stream`} 
                    className="w-full h-full object-cover" 
                    alt={cam.name} 
                  />

                  {/* Scanline overlay */}
                  <div className="absolute inset-0 scan-line pointer-events-none opacity-20"></div>

                  {/* Corner overlays for industrial visual detail */}
                  <div className="absolute top-2 left-2 text-[8px] text-slate-500 font-mono">
                    CH_{cam.id.replace('CAM-', '')}_REC_D4
                  </div>
                  <div className="absolute top-2 right-2 text-[8px] text-slate-500 font-mono">
                    AUTO_INF_ON
                  </div>

                  <div className="absolute bottom-2 left-2 bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded text-[9px] font-mono text-slate-450 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse inline-block"></span>
                    FPS: {liveFps}
                  </div>
                  
                  <div className="absolute bottom-2 right-2 bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded text-[9px] font-mono text-slate-450">
                    RES: {cam.resolution}
                  </div>
                </div>

                {/* Telemetry info cards */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="p-2.5 bg-slate-950/50 border border-slate-850 rounded-xl text-center">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">Workers On Feed</span>
                    <span className="text-sm font-mono font-bold text-slate-200">{cam.detectedCount}</span>
                  </div>
                  <div className="p-2.5 bg-slate-950/50 border border-slate-850 rounded-xl text-center">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">Network Health</span>
                    <span className="text-sm font-mono font-bold text-emerald-400">{cam.connectionStatus}</span>
                  </div>
                  <div className="p-2.5 bg-slate-950/50 border border-slate-850 rounded-xl text-center flex flex-col justify-center">
                    <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider mb-0.5">PPE Omissions</span>
                    {cam.id === 'CAM-02' ? (
                      <span className="text-[10px] text-red-400 font-bold uppercase tracking-wide">1 Critical</span>
                    ) : cam.id === 'CAM-03' ? (
                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wide">1 Warning</span>
                    ) : (
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wide">None</span>
                    )}
                  </div>
                </div>

                {/* Render bounding details */}
                <div className="mt-3.5 p-3 bg-slate-950/20 border border-slate-850/60 rounded-xl">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Detected PPE Telemetry</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cam.id === 'CAM-01' && (
                      <>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 px-2 py-0.5 rounded-full font-mono font-semibold">Helmet ✔</span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 px-2 py-0.5 rounded-full font-mono font-semibold">Vest ✔</span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 px-2 py-0.5 rounded-full font-mono font-semibold">Gloves ✔</span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 px-2 py-0.5 rounded-full font-mono font-semibold">Steel Shoes ✔</span>
                      </>
                    )}
                    {cam.id === 'CAM-02' && (
                      <>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 px-2 py-0.5 rounded-full font-mono font-semibold">Helmet ✔</span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 px-2 py-0.5 rounded-full font-mono font-semibold">Shield ✔</span>
                        <span className="text-[10px] bg-red-500/15 text-red-400 border border-red-500/10 px-2 py-0.5 rounded-full font-mono font-semibold">Gloves ✖</span>
                      </>
                    )}
                    {cam.id === 'CAM-03' && (
                      <>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 px-2 py-0.5 rounded-full font-mono font-semibold">Helmet ✔</span>
                        <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/15 px-2 py-0.5 rounded-full font-mono font-semibold">Respirator Mask ✖ (Loose)</span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 px-2 py-0.5 rounded-full font-mono font-semibold">Gloves ✔</span>
                      </>
                    )}
                    {cam.id === 'CAM-04' && (
                      <>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 px-2 py-0.5 rounded-full font-mono font-semibold">Helmet ✔</span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 px-2 py-0.5 rounded-full font-mono font-semibold">Vest ✔</span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 px-2 py-0.5 rounded-full font-mono font-semibold">Steel Shoes ✔</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3.5 border-t border-slate-850/80 flex items-center justify-between">
                <button 
                  onClick={() => handleRestartNode(cam.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-xs transition-colors"
                >
                  <RefreshCw className="h-3 w-3" />
                  Reboot Edge Node
                </button>
                <button 
                  onClick={() => alert(`Opening stream ${cam.id} in detailed diagnostic view...`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-xl text-xs font-semibold transition-colors"
                >
                  <Maximize2 className="h-3 w-3" />
                  Expand Stream
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
