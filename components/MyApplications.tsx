
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

  const savedJobs = jobs.filter(j => savedJobIds.includes(j.id));

  // Helper to get status info
  const getStatusDisplay = (status: Application['status']) => {
    switch (status) {
      case 'accepted':
        return {
          label: 'Aprovado',
          classes: 'bg-green-950/40 text-green-400 border-green-800/30',
          dot: 'bg-green-500'
        };
      case 'rejected':
        return {
          label: 'Finalizado',
          classes: 'bg-slate-900 text-slate-500 border-slate-800',
          dot: 'bg-slate-600'
        };
      case 'pending':
      default:
        return {
          label: 'Em análise',
          classes: 'bg-amber-950/40 text-amber-500 border-amber-800/30',
          dot: 'bg-amber-500 animate-pulse'
        };
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-6 pb-24 no-scrollbar">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Minhas Vagas</h1>
        <p className="text-slate-500 text-sm mt-1">Acompanhe seu progresso e interesses</p>
      </div>
      
      <div className="flex bg-slate-900 rounded-2xl p-1 mb-8 border border-slate-800 shadow-inner">
        <button 
          onClick={() => setActiveTab('applied')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === 'applied' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-400'}`}
        >
          Inscritas ({applications.length})
        </button>
        <button 
          onClick={() => setActiveTab('saved')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === 'saved' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-400'}`}
        >
          Salvas ({savedJobs.length})
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'applied' ? (
          applications.length === 0 ? (
            <EmptyState message="Você ainda não se candidatou a nenhuma vaga." />
          ) : (
            applications.map(app => {
              const job = jobs.find(j => j.id === app.jobId);
              if (!job) return null;
              const statusInfo = getStatusDisplay(app.status);
              
              return (
                <button
                  key={app.id}
                  onClick={() => onSelectJob(job)}
                  className="w-full text-left bg-slate-900 p-4 rounded-2xl border border-slate-800 flex gap-4 active:bg-slate-800 transition-all group relative overflow-hidden"
                >
                  <div className="h-12 w-12 bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-500 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-white truncate group-hover:text-blue-400 transition-colors">{job.title}</h3>
                    </div>
                    <p className="text-sm text-slate-500 truncate mb-3">{job.company}</p>
                    
                    <div className={`inline-flex items-center gap-1.5 border px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${statusInfo.classes}`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${statusInfo.dot}`}></div>
                      {statusInfo.label}
                    </div>
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 group-hover:text-slate-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </div>
                </button>
              );
            })
          )
        ) : (
          savedJobs.length === 0 ? (
            <EmptyState message="Você ainda não favoritou nenhuma vaga." />
          ) : (
            savedJobs.map(job => (
              <button
                key={job.id}
                onClick={() => onSelectJob(job)}
                className="w-full text-left bg-slate-900 p-4 rounded-2xl border border-slate-800 flex gap-4 active:bg-slate-800 transition-all group relative"
              >
                <div className="h-12 w-12 bg-amber-900/20 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white truncate group-hover:text-amber-400 transition-colors">{job.title}</h3>
                  <p className="text-sm text-slate-500 truncate mb-2">{job.company}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-green-400 bg-green-950/40 px-2 py-0.5 rounded">{job.salary}</span>
                    <span className="text-[10px] text-slate-600">• {job.distance}km</span>
                  </div>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </div>
              </button>
            ))
          )
        )}
      </div>
    </div>
  );
};

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="py-24 text-center px-10 animate-in fade-in duration-500">
    <div className="w-20 h-20 bg-slate-900/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-800/50">
       <svg className="w-10 h-10 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
       </svg>
    </div>
    <p className="text-slate-500 text-sm font-medium leading-relaxed">{message}</p>
  </div>
);

export default MyApplications;
