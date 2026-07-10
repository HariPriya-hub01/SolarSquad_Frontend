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
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 font-sans">Camera Device Management</h1>
          <p className="text-sm text-slate-500 font-light">Configure computer vision parameters, frame rates, and edge network parameters.</p>
        </div>
        
        {/* Add Camera button */}
        <button
          onClick={() => alert('Register new edge device wizard started...')}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add AI Camera
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.map((cam) => {
          const isActive = cam.status === 'Active';
          let statusBadgeClass = 'text-emerald-700 bg-emerald-50 border border-emerald-200';
          if (!isActive) statusBadgeClass = 'text-red-700 bg-red-50 border border-red-200';

          return (
            <div key={cam.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between animate-fade-in">
              
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Camera className={`h-4.5 w-4.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <h3 className="text-xs font-bold text-slate-800">{cam.name}</h3>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${statusBadgeClass}`}>
                    {cam.status}
                  </span>
                </div>

                {/* Details list */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-400">Location / Zone:</span>
                    <span className="font-semibold text-slate-800">{cam.location}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-400">Resolution:</span>
                    <span className="font-mono text-slate-800">{isActive ? cam.resolution : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-400">Target FPS:</span>
                    <span className="font-mono text-slate-800">{isActive ? `${cam.fps} FPS` : '0 FPS'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="text-slate-400">Last Active:</span>
                    <span className="font-mono text-slate-800">{cam.lastActive}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Connection Health:</span>
                    <span className={`font-semibold ${
                      cam.connectionStatus === 'Excellent' ? 'text-emerald-600' : cam.connectionStatus === 'Good' ? 'text-blue-600' : 'text-red-600'
                    }`}>{cam.connectionStatus}</span>
                  </div>
                </div>
              </div>

              {/* Actions footer */}
              <div className="mt-5 pt-3.5 border-t border-slate-200 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleRestart(cam.id)}
                  className="flex items-center justify-center gap-1.5 px-2 py-1.5 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg text-[10px] font-semibold transition-colors flex-1 shadow-sm"
                  title="Reboot camera node"
                >
                  <RefreshCw className="h-3 w-3" />
                  Restart
                </button>
                <button
                  onClick={() => handleEdit(cam.id)}
                  className="flex items-center justify-center gap-1.5 px-2 py-1.5 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg text-[10px] font-semibold transition-colors flex-1 shadow-sm"
                  title="Configure camera settings"
                >
                  <Sliders className="h-3 w-3" />
                  Edit
                </button>
                <button
                  onClick={() => handleRemove(cam.id)}
                  className="flex items-center justify-center p-1.5 bg-red-50 hover:bg-red-100 text-red-650 hover:text-red-750 border border-red-200 rounded-lg text-[10px] transition-colors shadow-sm"
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
