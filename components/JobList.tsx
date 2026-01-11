
import React from 'react';
import { Job } from '../types';

interface JobListProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onSelectJob }) => {
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 opacity-60">
        <svg className="w-16 h-16 text-slate-800 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p className="text-slate-600 font-medium">Nenhuma vaga encontrada</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Vagas em sua região</h2>
      {jobs.map(job => (
        <button
          key={job.id}
          onClick={() => onSelectJob(job)}
          className="w-full text-left bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-800 flex gap-4 active:bg-slate-800 transition-colors"
        >
          <div className="h-12 w-12 bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-500 shrink-0">
            {job.companyType === 'market' && <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
            {job.companyType === 'restaurant' && <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3z" /></svg>}
            {job.companyType === 'bakery' && <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 18V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2zM14 18h7a2 2 0 002-2v-4a2 2 0 00-2-2h-7" /></svg>}
            {job.companyType === 'pharmacy' && <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20" /></svg>}
            {job.companyType === 'shop' && <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-100 truncate">{job.title}</h3>
            <p className="text-sm text-slate-500 truncate">{job.company}</p>
            <div className="flex items-center gap-3 mt-2">
               <span className="text-xs font-bold text-green-400 bg-green-950/40 px-2 py-0.5 rounded">{job.salary}</span>
               <span className="text-xs text-slate-600">• {job.distance}km de você</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default JobList;
