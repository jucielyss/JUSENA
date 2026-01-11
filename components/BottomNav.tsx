
import React from 'react';
import { UserRole } from '../types';

interface BottomNavProps {
  activeTab: 'map' | 'list' | 'profile' | 'employer' | 'candidaturas' | 'candidatos';
  setActiveTab: (tab: any) => void;
  role: UserRole;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, role }) => {
  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-slate-950 border-t border-slate-900 flex justify-around items-center py-4 px-6 z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.2)] rounded-t-3xl backdrop-blur-md bg-opacity-95">
      {role === 'candidate' ? (
        <>
          <button 
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'map' || activeTab === 'list' ? 'text-sky-500 scale-110' : 'text-slate-600'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className="text-[10px] font-bold">Explorar</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('candidaturas')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'candidaturas' ? 'text-sky-500 scale-110' : 'text-slate-600'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            <span className="text-[10px] font-bold">Minhas Vagas</span>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'profile' ? 'text-sky-500 scale-110' : 'text-slate-600'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="text-[10px] font-bold">Perfil</span>
          </button>
        </>
      ) : (
        <>
          <button 
            onClick={() => setActiveTab('employer')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'employer' ? 'text-emerald-500 scale-110' : 'text-slate-600'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            <span className="text-[10px] font-bold">Vagas</span>
          </button>

          <button 
            onClick={() => setActiveTab('candidatos')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'candidatos' ? 'text-emerald-500 scale-110' : 'text-slate-600'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span className="text-[10px] font-bold">Candidatos</span>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'profile' ? 'text-emerald-500 scale-110' : 'text-slate-600'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="text-[10px] font-bold">Perfil</span>
          </button>
        </>
      )}
    </nav>
  );
};

export default BottomNav;
