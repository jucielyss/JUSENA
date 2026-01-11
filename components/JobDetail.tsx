
import React from 'react';
import { Job } from '../types';

interface JobDetailProps {
  job: Job;
  isApplied: boolean;
  isSaved: boolean;
  onClose: () => void;
  onApply: () => void;
  onToggleSave: () => void;
}

const JobDetail: React.FC<JobDetailProps> = ({ job, isApplied, isSaved, onClose, onApply, onToggleSave }) => {
  return (
    <div className="absolute inset-0 bg-slate-950 z-50 flex flex-col animate-in slide-in-from-bottom-full duration-300">
      <div className="relative h-48 bg-blue-600 flex items-center justify-center overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-6 left-4 bg-black/20 backdrop-blur-md p-2 rounded-full text-white active:bg-black/40"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button 
          onClick={onToggleSave}
          className={`absolute top-6 right-4 p-2 rounded-full backdrop-blur-md transition-all ${isSaved ? 'bg-amber-500 text-white shadow-lg' : 'bg-black/20 text-white active:bg-black/40'}`}
        >
          <svg className="w-6 h-6" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
        <div className="text-white text-center p-6 mt-4">
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <p className="opacity-80">{job.company}</p>
        </div>
      </div>

      <div className="flex-1 -mt-6 bg-slate-950 rounded-t-3xl p-6 overflow-y-auto no-scrollbar pb-32">
        <div className="flex justify-between items-center mb-6">
            <div className="bg-slate-900 px-4 py-2 rounded-xl text-center flex-1 mr-2 border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Salário</p>
                <p className="text-green-400 font-bold">{job.salary}</p>
            </div>
            <div className="bg-slate-900 px-4 py-2 rounded-xl text-center flex-1 mx-2 border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Turno</p>
                <p className="text-slate-300 font-bold capitalize">{job.shift === 'morning' ? 'Manhã' : job.shift === 'afternoon' ? 'Tarde' : job.shift === 'night' ? 'Noite' : 'Flexível'}</p>
            </div>
            <div className="bg-slate-900 px-4 py-2 rounded-xl text-center flex-1 ml-2 border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Distância</p>
                <p className="text-slate-300 font-bold">{job.distance}km</p>
            </div>
        </div>

        <section className="mb-6">
          <h3 className="font-bold text-slate-100 mb-2">Sobre a vaga</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {job.description}
          </p>
        </section>

        <section className="mb-6">
          <h3 className="font-bold text-slate-100 mb-2">Requisitos</h3>
          <ul className="space-y-2">
            {job.requirements.map((req, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                {req}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
            <h3 className="font-bold text-slate-100 mb-2">Localização</h3>
            <div className="p-3 bg-slate-900 rounded-lg flex items-center gap-3 border border-slate-800">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <p className="text-xs text-slate-400 font-medium">{job.location.address}</p>
            </div>
        </section>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-slate-950 border-t border-slate-900 flex gap-4">
        {isApplied ? (
          <div className="flex-1 bg-green-900/20 text-green-400 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 border border-green-900/30">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            Candidatura Enviada
          </div>
        ) : (
          <button 
            onClick={onApply}
            className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-950 active:scale-[0.98] transition-all"
          >
            Candidatar-se Agora
          </button>
        )}
        <button className="h-14 w-14 border-2 border-slate-900 rounded-2xl flex items-center justify-center text-slate-600 active:bg-slate-900 active:text-amber-500 transition-colors" onClick={onToggleSave}>
          <svg className={`w-6 h-6 ${isSaved ? 'text-amber-500 fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
        </button>
      </div>
    </div>
  );
};

export default JobDetail;
