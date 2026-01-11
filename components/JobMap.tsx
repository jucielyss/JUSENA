
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
  const [zoom, setZoom] = useState(1); 
  
  const clusters = useMemo(() => {
    if (zoom >= 3) return [];
    const clusterSize = zoom === 1 ? 25 : 12;
    const grid: Record<string, Job[]> = {};

    jobs.forEach((job, idx) => {
      const top = 20 + (idx * 20) % 60;
      const left = 15 + (idx * 25) % 70;
      const gridX = Math.floor(left / clusterSize);
      const gridY = Math.floor(top / clusterSize);
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

  return (
    <div className="h-full w-full bg-slate-950 relative overflow-hidden transition-all duration-700 ease-in-out">
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `scale(${1 + (zoom - 1) * 0.2})` }}
      >
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}></div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/20 scale-150"></div>
          <div className="h-5 w-5 bg-blue-500 rounded-full border-[3px] border-slate-950"></div>
        </div>
      </div>

      <div 
        className="absolute inset-0 transition-transform duration-700 ease-in-out origin-center"
        style={{ transform: `scale(${0.8 + zoom * 0.2})` }}
      >
        {clusters.map((cluster) => (
          <button
            key={cluster.id}
            onClick={() => setZoom(prev => Math.min(prev + 1, 3))}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
            style={{ top: `${cluster.avgTop}%`, left: `${cluster.avgLeft}%` }}
          >
            <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white border-2 border-slate-950 font-black text-sm">
              {cluster.count}
            </div>
          </button>
        ))}

        {individualPins.map((job) => {
          const originalIdx = jobs.findIndex(j => j.id === job.id);
          const top = 20 + (originalIdx * 20) % 60;
          const left = 15 + (originalIdx * 25) % 70;
          return (
            <button
              key={job.id}
              onClick={() => onSelectJob(job)}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ top: `${top}%`, left: `${left}%` }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-slate-900 px-3 py-1 rounded-xl border border-slate-800 mb-1">
                  <p className="text-[10px] text-green-400 font-black">{job.salary}</p>
                </div>
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white border-2 border-slate-950">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="absolute right-4 bottom-24 flex flex-col gap-3 z-40">
        <button onClick={handleZoomIn} className="h-12 w-12 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center justify-center text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 5v14M5 12h14" /></svg></button>
        <button onClick={handleZoomOut} className="h-12 w-12 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center justify-center text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14" /></svg></button>
      </div>
    </div>
  );
};

export default JobMap;
