
import React from 'react';
import { Job } from '../types';

interface EmployerCandidatesProps {
  jobs: Job[];
}

const EmployerCandidates: React.FC<EmployerCandidatesProps> = ({ jobs }) => {
  const myJobs = jobs.filter(j => j.company === 'Minha Loja' || j.id === '1'); // Mock: including job 1 to show candidates

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-6 pb-24 no-scrollbar">
      <h1 className="text-2xl font-bold text-white mb-6">Candidatos</h1>
      
      <div className="space-y-6">
        {myJobs.map(job => (
          <div key={job.id}>
            <div className="flex justify-between items-end mb-3">
               <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">{job.title}</h2>
               <span className="text-[10px] bg-emerald-950/40 text-emerald-400 font-black px-2 py-0.5 rounded">2 NOVOS</span>
            </div>
            
            <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex gap-4">
                  <img src={`https://picsum.photos/seed/candidate${i}/100`} className="h-12 w-12 rounded-full border border-slate-700" alt="Avatar" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                       <h4 className="font-bold text-white">Candidato {i}</h4>
                       <span className="text-[9px] text-slate-600 font-bold uppercase">Hoje, 10:30</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2 truncate">Exp: Balconista (2 anos) • São Paulo, SP</p>
                    <div className="flex gap-2">
                       <button className="flex-1 bg-emerald-600/20 text-emerald-400 text-[10px] font-bold py-1.5 rounded-lg border border-emerald-600/30">
                          Chamar
                       </button>
                       <button className="flex-1 bg-slate-800 text-slate-400 text-[10px] font-bold py-1.5 rounded-lg">
                          Perfil
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {myJobs.length === 0 && (
          <div className="text-center py-20 px-10">
            <p className="text-slate-500 font-medium">Aguardando novos candidatos...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerCandidates;
