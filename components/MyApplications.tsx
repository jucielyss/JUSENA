
import React, { useState } from 'react';
import { Application, Job } from '../types';

interface MyApplicationsProps {
  applications: Application[];
  savedJobIds: string[];
  jobs: Job[];
  onSelectJob: (job: Job) => void;
}

const MyApplications: React.FC<MyApplicationsProps> = ({ applications, savedJobIds, jobs, onSelectJob }) => {
  const [activeTab, setActiveTab] = useState<'applied' | 'saved'>('applied');

  const appliedJobs = applications.map(app => jobs.find(j => j.id === app.jobId)).filter(Boolean) as Job[];
  const savedJobs = jobs.filter(j => savedJobIds.includes(j.id));

  const displayJobs = activeTab === 'applied' ? appliedJobs : savedJobs;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-6 pb-24 no-scrollbar">
      <h1 className="text-2xl font-bold text-white mb-6">Minhas Vagas</h1>
      
      <div className="flex bg-slate-900 rounded-2xl p-1 mb-6 border border-slate-800">
        <button 
          onClick={() => setActiveTab('applied')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'applied' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}
        >
          Inscritas ({appliedJobs.length})
        </button>
        <button 
          onClick={() => setActiveTab('saved')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'saved' ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-500'}`}
        >
          Salvas ({savedJobs.length})
        </button>
      </div>

      <div className="space-y-4">
        {displayJobs.length === 0 ? (
          <div className="py-20 text-center px-10">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-800">
               <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a.75.75 0 00-1.06 1.06l.53.53a5.002 5.002 0 018.39 0l.53-.53a.75.75 0 10-1.06-1.06l-.53.53a3.502 3.502 0 00-5.87 0l-.53-.53z" />
               </svg>
            </div>
            <p className="text-slate-600 text-sm font-medium">Nenhuma vaga por aqui ainda.</p>
          </div>
        ) : (
          displayJobs.map(job => (
            <button
              key={job.id}
              onClick={() => onSelectJob(job)}
              className="w-full text-left bg-slate-900 p-4 rounded-2xl border border-slate-800 flex gap-4 active:bg-slate-800 transition-all group"
            >
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${activeTab === 'applied' ? 'bg-blue-900/20 text-blue-500' : 'bg-amber-900/20 text-amber-500'}`}>
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white truncate group-hover:text-sky-400 transition-colors">{job.title}</h3>
                <p className="text-sm text-slate-500 truncate">{job.company}</p>
                {activeTab === 'applied' ? (
                  <div className="mt-2 inline-flex items-center gap-1.5 bg-blue-950/40 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                    Em análise
                  </div>
                ) : (
                  <div className="mt-2 inline-flex items-center gap-1.5 bg-amber-950/40 text-amber-500 text-[10px] font-bold px-2 py-0.5 rounded">
                    Favoritada
                  </div>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default MyApplications;
