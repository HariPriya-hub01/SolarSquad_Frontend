import React, { useState } from 'react';
import { Camera, Sliders, RefreshCw, Trash2, Plus, AlertTriangle, MonitorPlay } from 'lucide-react';
import { CAMERA_FEEDS } from '../data/mockData';

export default function CameraManagement() {
  const [cameras, setCameras] = useState(CAMERA_FEEDS);

  const handleRestart = (id) => {
    alert(`Reboot command sent to Camera: ${id}. Ping response expected in 10 seconds.`);
  };

  const handleEdit = (id) => {
    alert(`Opening EHS Edge Config panel for: ${id}`);
  };

  const handleRemove = (id) => {
    if (confirm(`Are you sure you want to remove and disconnect Camera ${id}?`)) {
      setCameras(cameras.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">Camera Device Management</h1>
          <p className="text-sm text-slate-400">Configure computer vision parameters, frame rates, and edge network parameters.</p>
        </div>
        
        {/* Add Camera button */}
        <button
          onClick={() => alert('Register new edge device wizard started...')}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_12px_rgba(59,130,246,0.2)]"
        >
          <Plus className="h-4 w-4" />
          Add AI Camera
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.map((cam) => {
          const isActive = cam.status === 'Active';
          let statusBadgeClass = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
          if (!isActive) statusBadgeClass = 'text-red-400 bg-red-500/10 border-red-500/20';

          return (
            <div key={cam.id} className="bg-[#111827] border border-slate-850 rounded-2xl p-5 shadow-xl hover:border-slate-800 transition-all flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-850">
                  <div className="flex items-center gap-2">
                    <Camera className={`h-4.5 w-4.5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                    <h3 className="text-xs font-bold text-slate-200">{cam.name}</h3>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${statusBadgeClass}`}>
                    {cam.status}
                  </span>
                </div>

                {/* Details list */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-900 pb-1">
                    <span className="text-slate-450">Location / Zone:</span>
                    <span className="font-semibold text-slate-205">{cam.location}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1">
                    <span className="text-slate-450">Resolution:</span>
                    <span className="font-mono text-slate-205">{isActive ? cam.resolution : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1">
                    <span className="text-slate-450">Target FPS:</span>
                    <span className="font-mono text-slate-205">{isActive ? `${cam.fps} FPS` : '0 FPS'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1">
                    <span className="text-slate-450">Last Active:</span>
                    <span className="font-mono text-slate-205">{cam.lastActive}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-450">Connection Health:</span>
                    <span className={`font-semibold ${
                      cam.connectionStatus === 'Excellent' ? 'text-emerald-400' : cam.connectionStatus === 'Good' ? 'text-blue-400' : 'text-red-400'
                    }`}>{cam.connectionStatus}</span>
                  </div>
                </div>
              </div>

              {/* Actions footer */}
              <div className="mt-5 pt-3.5 border-t border-slate-850/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleRestart(cam.id)}
                  className="flex items-center justify-center gap-1.5 px-2 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-350 hover:text-white border border-slate-800 rounded-lg text-[10px] font-semibold transition-colors flex-1"
                  title="Reboot camera node"
                >
                  <RefreshCw className="h-3 w-3" />
                  Restart
                </button>
                <button
                  onClick={() => handleEdit(cam.id)}
                  className="flex items-center justify-center gap-1.5 px-2 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-350 hover:text-white border border-slate-800 rounded-lg text-[10px] font-semibold transition-colors flex-1"
                  title="Configure camera settings"
                >
                  <Sliders className="h-3 w-3" />
                  Edit
                </button>
                <button
                  onClick={() => handleRemove(cam.id)}
                  className="flex items-center justify-center p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/10 rounded-lg text-[10px] transition-colors"
                  title="Decommission camera"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
