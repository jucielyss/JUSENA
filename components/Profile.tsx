
import React, { useState, useEffect } from 'react';
import { UserRole, CandidateProfile, ExperienceEntry } from '../types';

interface ProfileProps {
  role: UserRole;
  stats: {
    applications: number;
    saved: number;
  };
  onRoleSwitch: (role: UserRole) => void;
  onLogout: () => void;
}

const DEFAULT_PROFILE: CandidateProfile = {
  name: 'João da Silva',
  email: 'joao.silva@email.com',
  photo: null,
  city: 'São Paulo, SP',
  phone: '(11) 98765-4321',
  visibility: 'public',
  hasWorkedBefore: true,
  lastRole: 'Repositor',
  lastCompany: 'Mercado Central',
  yearsOfExperience: '1-2 anos',
  experiences: [
    { id: '1', role: 'Repositor', company: 'Mercado Central', period: '2022 - 2023', description: 'Organização de gôndolas e conferência de validade.' }
  ],
  skills: ['Atendimento', 'Organização', 'Pacote Office'],
  areasOfInterest: ['Varejo', 'Logística'],
  shiftAvailability: ['morning', 'afternoon'],
  workTypePreference: ['presencial'],
  resumeFileName: 'curriculo_joao.pdf',
  resumeUploadDate: '15/05/2024'
};

const Profile: React.FC<ProfileProps> = ({ role, stats, onRoleSwitch, onLogout }) => {
  const [profile, setProfile] = useState<CandidateProfile>(DEFAULT_PROFILE);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('candidate_profile');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved profile", e);
      }
    }
  }, []);

  const saveProfile = (newProfile: CandidateProfile) => {
    setProfile(newProfile);
    localStorage.setItem('candidate_profile', JSON.stringify(newProfile));
    showToast("Perfil atualizado com sucesso");
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfile({ ...profile, photo: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const toggleVisibility = () => {
    const newStatus = profile.visibility === 'public' ? 'anonymous' : 'public';
    const newProfile = { ...profile, visibility: newStatus as any };
    setProfile(newProfile);
    showToast(newStatus === 'public' ? "Perfil agora está público" : "Perfil agora está anônimo");
  };

  if (role === 'employer') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-950">
        <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mb-4 text-green-500">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Painel da Empresa</h2>
        <p className="text-slate-400 mb-6 text-sm leading-relaxed">Você está visualizando o perfil como contratante. Para editar seu currículo, mude para o modo Candidato.</p>
        <button 
           onClick={() => onRoleSwitch('candidate')}
           className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white font-bold active:scale-95 transition-all mb-4 w-full"
        >
          Mudar para Candidato
        </button>
        <button onClick={onLogout} className="text-red-500 font-bold text-sm">Sair da Conta</button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 pb-32 no-scrollbar">
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold animate-in fade-in slide-in-from-top-4 duration-300">
          {toast}
        </div>
      )}

      <div className="p-6 border-b border-slate-900 sticky top-0 bg-slate-950/80 backdrop-blur-md z-40">
        <h1 className="text-2xl font-bold text-white">Meu Perfil</h1>
        <div className="flex items-center gap-2 mt-1">
          <div className={`h-2 w-2 rounded-full ${profile.visibility === 'public' ? 'bg-green-500' : 'bg-slate-600'}`}></div>
          <p className="text-sm text-slate-500">
            {profile.visibility === 'public' ? 'Seu perfil está visível para empresas' : 'Seu perfil está oculto para empresas'}
          </p>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="flex gap-4">
            <div className="flex-1 bg-slate-900 rounded-2xl py-4 text-center border border-slate-800 shadow-sm">
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider mb-1">Inscritas</p>
                <p className="text-2xl font-black text-blue-500">{stats.applications}</p>
            </div>
            <div className="flex-1 bg-slate-900 rounded-2xl py-4 text-center border border-slate-800 shadow-sm">
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider mb-1">Salvas</p>
                <p className="text-2xl font-black text-amber-500">{stats.saved}</p>
            </div>
        </div>

        <section>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Status de busca</p>
                <h3 className="text-white font-bold">{profile.visibility === 'public' ? 'Estou buscando emprego' : 'Não estou buscando agora'}</h3>
              </div>
              <button 
                onClick={toggleVisibility}
                className={`relative w-14 h-8 rounded-full transition-colors ${profile.visibility === 'public' ? 'bg-green-600' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${profile.visibility === 'public' ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-slate-900 overflow-hidden bg-slate-900 shadow-xl">
              {profile.photo ? (
                <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-700">
                   <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
              )}
            </div>
            <label className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full border-4 border-slate-950 cursor-pointer shadow-lg active:scale-90 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2">Informações Básicas</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Nome Completo</label>
              <input 
                value={profile.name} 
                onChange={e => setProfile({...profile, name: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Cidade</label>
                <input 
                  value={profile.city} 
                  onChange={e => setProfile({...profile, city: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Telefone</label>
                <input 
                  value={profile.phone} 
                  onChange={e => setProfile({...profile, phone: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pt-10 space-y-4">
          <div className="p-4 bg-green-950/10 border border-green-900/20 rounded-2xl flex justify-between items-center">
            <div>
              <span className="font-bold text-green-500 text-sm">Modo Empresa</span>
              <p className="text-[10px] text-slate-600 mt-1">Mude para postar vagas no Fácil Zipe.</p>
            </div>
            <button 
              onClick={() => onRoleSwitch('employer')}
              className="px-4 py-2 bg-green-600/20 text-green-400 text-xs font-bold rounded-lg border border-green-600/30 active:scale-95 transition-all"
            >
              Ativar
            </button>
          </div>
          <button onClick={onLogout} className="w-full py-4 text-red-500 font-bold text-sm bg-red-950/10 rounded-2xl border border-red-900/20 active:scale-95 transition-all">Sair da Conta</button>
        </section>
      </div>

      <div className="fixed bottom-24 left-0 right-0 p-6 z-40 pointer-events-none">
        <div className="max-w-md mx-auto flex gap-4">
          <button 
            onClick={() => saveProfile(profile)}
            className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-950 pointer-events-auto active:scale-[0.98] transition-all"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
