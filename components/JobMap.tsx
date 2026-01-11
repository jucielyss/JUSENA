
import React, { useState, useMemo } from 'react';
import { Job } from '../types';

interface JobMapProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
}

interface Cluster {
  id: string;
  count: number;
  avgTop: number;
  avgLeft: number;
  jobs: Job[];
}

const JobMap: React.FC<JobMapProps> = ({ jobs, onSelectJob }) => {
  const [zoom, setZoom] = useState(1); // Levels 1, 2, 3
  
  // Refined clustering logic based on zoom-dependent grid sizes
  const clusters = useMemo(() => {
    if (zoom >= 3) return []; // No clusters at max zoom
    
    // Grid size shrinks as we zoom in (clustering gets more granular)
    const gridSize = zoom === 1 ? 25 : 15; 
    const grid: Record<string, Job[]> = {};

    jobs.forEach((job, idx) => {
      // Deterministic mock positioning
      const top = 20 + (idx * 20) % 60;
      const left = 15 + (idx * 25) % 70;
      
      const gridX = Math.floor(left / gridSize);
      const gridY = Math.floor(top / gridSize);
      const key = `${gridX}-${gridY}`;

      if (!grid[key]) grid[key] = [];
      grid[key].push(job);
    });

    const result: Cluster[] = [];
    Object.entries(grid).forEach(([key, clusterJobs]) => {
      if (clusterJobs.length > 1) {
        let sumTop = 0;
        let sumLeft = 0;
        clusterJobs.forEach((job) => {
          const idx = jobs.indexOf(job);
          sumTop += 20 + (idx * 20) % 60;
          sumLeft += 15 + (idx * 25) % 70;
        });

        result.push({
          id: key,
          count: clusterJobs.length,
          avgTop: sumTop / clusterJobs.length,
          avgLeft: sumLeft / clusterJobs.length,
          jobs: clusterJobs
        });
      }
    });
    return result;
  }, [jobs, zoom]);

  const individualPins = useMemo(() => {
    if (zoom < 3) {
      const clusteredJobIds = new Set(clusters.flatMap(c => c.jobs.map(j => j.id)));
      return jobs.filter(j => !clusteredJobIds.has(j.id));
    }
    return jobs;
  }, [jobs, clusters, zoom]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 1, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 1, 1));

  const handleClusterClick = (cluster: Cluster) => {
    // Zoom in on the cluster's location
    setZoom(prev => Math.min(prev + 1, 3));
  };

  return (
    <div className="h-full w-full bg-slate-950 relative overflow-hidden">
      {/* Animated Map Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `scale(${1 + (zoom - 1) * 0.25})` }}
      >
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}></div>
        {/* Mock Roads */}
        <div className="absolute top-1/3 left-0 w-full h-0.5 bg-slate-800 -rotate-12"></div>
        <div className="absolute top-0 left-1/4 w-0.5 h-full bg-slate-800 rotate-6"></div>
      </div>

      {/* User Location Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/30 scale-150"></div>
          <div className="h-5 w-5 bg-blue-600 rounded-full border-[3px] border-slate-950 shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
        </div>
      </div>

      {/* Zoomable Content Layer */}
      <div 
        className="absolute inset-0 transition-transform duration-700 ease-in-out origin-center"
        style={{ transform: `scale(${0.8 + zoom * 0.2})` }}
      >
        {/* Render Clusters */}
        {clusters.map((cluster) => {
          // Size based on count
          const size = cluster.count > 5 ? 'h-12 w-12' : 'h-10 w-10';
          return (
            <button
              key={cluster.id}
              onClick={() => handleClusterClick(cluster)}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-300 hover:scale-110 active:scale-95 animate-in fade-in zoom-in"
              style={{ top: `${cluster.avgTop}%`, left: `${cluster.avgLeft}%` }}
            >
              <div className="relative group">
                <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className={`${size} bg-blue-600 rounded-full flex items-center justify-center text-white border-2 border-slate-950 font-black text-sm shadow-[0_4px_12px_rgba(0,0,0,0.4)]`}>
                  {cluster.count}
                </div>
              </div>
            </button>
          );
        })}

        {/* Render Individual Job Pins */}
        {individualPins.map((job) => {
          const originalIdx = jobs.findIndex(j => j.id === job.id);
          const top = 20 + (originalIdx * 20) % 60;
          const left = 15 + (originalIdx * 25) % 70;
          
          return (
            <button
              key={job.id}
              onClick={() => onSelectJob(job)}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 hover:scale-110 active:scale-95 animate-in fade-in zoom-in"
              style={{ top: `${top}%`, left: `${left}%` }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 mb-1 shadow-md opacity-90 backdrop-blur-sm">
                  <p className="text-[10px] text-green-400 font-black whitespace-nowrap">{job.salary}</p>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/10 blur-sm rounded-full"></div>
                  <div className="h-9 w-9 bg-blue-600 rounded-full flex items-center justify-center text-white border-2 border-slate-950 shadow-lg relative">
                    {job.companyType === 'market' && <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                    {job.companyType === 'restaurant' && <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3z" /></svg>}
                    {job.companyType === 'bakery' && <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 18V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2zM14 18h7a2 2 0 002-2v-4a2 2 0 00-2-2h-7" /></svg>}
                    {job.companyType === 'pharmacy' && <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20" /></svg>}
                    {job.companyType === 'shop' && <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Map Controls */}
      <div className="absolute right-4 bottom-24 flex flex-col gap-3 z-40">
        <button 
          onClick={handleZoomIn} 
          disabled={zoom >= 3}
          className="h-12 w-12 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 flex items-center justify-center text-white active:scale-90 transition-all disabled:opacity-30 disabled:pointer-events-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 5v14M5 12h14" /></svg>
        </button>
        <button 
          onClick={handleZoomOut} 
          disabled={zoom <= 1}
          className="h-12 w-12 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 flex items-center justify-center text-white active:scale-90 transition-all disabled:opacity-30 disabled:pointer-events-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14" /></svg>
        </button>
      </div>

      {/* Zoom Indicator */}
      <div className="absolute left-6 bottom-24 z-40 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800">
        <div className="flex gap-1.5 items-center">
          <div className={`h-1.5 w-4 rounded-full transition-colors duration-500 ${zoom >= 1 ? 'bg-blue-500' : 'bg-slate-700'}`}></div>
          <div className={`h-1.5 w-4 rounded-full transition-colors duration-500 ${zoom >= 2 ? 'bg-blue-500' : 'bg-slate-700'}`}></div>
          <div className={`h-1.5 w-4 rounded-full transition-colors duration-500 ${zoom >= 3 ? 'bg-blue-500' : 'bg-slate-700'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default JobMap;
