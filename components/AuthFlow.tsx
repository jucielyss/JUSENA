
import React, { useState } from 'react';
import { UserRole } from '../types';

interface AuthFlowProps {
  onAuthenticated: (role: UserRole) => void;
}

type AuthStep = 'user_type' | 'login' | 'register_pf' | 'register_pj';

const AuthFlow: React.FC<AuthFlowProps> = ({ onAuthenticated }) => {
  const [step, setStep] = useState<AuthStep>('user_type');
  const [role, setRole] = useState<UserRole>('candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Helper para cores dinâmicas
  const theme = {
    primary: role === 'candidate' ? 'sky' : 'emerald',
    bgButton: role === 'candidate' ? 'bg-sky-600 hover:bg-sky-500 shadow-sky-950' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950',
    textPrimary: role === 'candidate' ? 'text-sky-500' : 'text-emerald-500',
    ring: role === 'candidate' ? 'focus:ring-sky-500' : 'focus:ring-emerald-500',
    border: role === 'candidate' ? 'group-hover:border-sky-500' : 'group-hover:border-emerald-500'
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onAuthenticated(role);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthenticated(role);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const renderUserType = () => (
    <div className="flex flex-col gap-6 p-6 h-full justify-center">
      <div className="text-center mb-8">
        <div className="inline-flex bg-sky-600 text-white p-3 rounded-2xl mb-4 shadow-lg shadow-sky-900/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M7 7h10M7 12h10M7 17h10" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Fácil Zipe</h1>
        <p className="text-slate-400 text-sm">Onde o trabalho local encontra você</p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => { setRole('candidate'); setStep('login'); }}
          className="w-full bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center gap-4 hover:border-sky-500 transition-all group active:scale-[0.98]"
        >
          <div className="h-12 w-12 bg-sky-900/30 text-sky-400 rounded-2xl flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <div className="text-left">
            <p className="font-bold text-white">Sou Candidato</p>
            <p className="text-xs text-slate-400">Procuro um emprego rápido</p>
          </div>
        </button>

        <button
          onClick={() => { setRole('employer'); setStep('login'); }}
          className="w-full bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center gap-4 hover:border-emerald-500 transition-all group active:scale-[0.98]"
        >
          <div className="h-12 w-12 bg-emerald-900/30 text-emerald-400 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <div className="text-left">
            <p className="font-bold text-white">Sou Empresa</p>
            <p className="text-xs text-slate-400">Quero anunciar vagas agora</p>
          </div>
        </button>
      </div>
    </div>
  );

  const renderLogin = () => (
    <div className="flex flex-col h-full p-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <button onClick={() => setStep('user_type')} className="text-slate-400 mb-8 flex items-center gap-2 text-sm font-medium">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        Mudar tipo de conta
      </button>

      <h2 className="text-2xl font-bold text-white mb-2">Bem-vindo de volta!</h2>
      <p className="text-slate-400 text-sm mb-8 flex items-center gap-2">
        Entrando como 
        <span className={`font-bold px-2 py-0.5 rounded-lg bg-${theme.primary}-900/20 ${theme.textPrimary}`}>
          {role === 'candidate' ? 'Candidato' : 'Empresa'}
        </span>
      </p>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">E-mail</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-4 text-white placeholder:text-slate-600 focus:ring-2 ${theme.ring} outline-none transition-all`}
            placeholder="seu@email.com"
          />
        </div>
        <div className="relative">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Senha</label>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-4 text-white placeholder:text-slate-600 focus:ring-2 ${theme.ring} outline-none transition-all`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-[42px] text-slate-500"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.882 9.882L5.146 5.147m13.71 13.71l-4.736-4.736M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={!email || !password}
          className={`w-full ${theme.bgButton} disabled:opacity-50 disabled:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98]`}
        >
          Entrar
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Não tem uma conta?{' '}
        <button
          onClick={() => setStep(role === 'candidate' ? 'register_pf' : 'register_pj')}
          className={`${theme.textPrimary} font-bold`}
        >
          Criar conta
        </button>
      </p>
    </div>
  );

  const renderRegisterPF = () => (
    <div className="flex flex-col h-full p-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <button onClick={() => setStep('login')} className="text-slate-400 mb-8 flex items-center gap-2 text-sm font-medium">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        Já tenho conta
      </button>

      <h2 className="text-2xl font-bold text-white mb-2">Crie seu perfil</h2>
      <p className="text-slate-400 text-sm mb-8">Rápido, sem currículo em PDF.</p>

      <form onSubmit={handleRegister} className="space-y-6 overflow-y-auto no-scrollbar pb-10">
        <div className="flex justify-center mb-4">
          <label className="relative cursor-pointer group">
            <div className={`w-24 h-24 rounded-full border-2 border-dashed ${photoPreview ? 'border-sky-500' : 'border-slate-800'} flex items-center justify-center overflow-hidden bg-slate-900 transition-all group-hover:bg-slate-800`}>
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              )}
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
            <div className="absolute bottom-0 right-0 bg-sky-600 text-white p-1.5 rounded-full border-2 border-slate-950">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
            </div>
          </label>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Nome Completo</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-4 text-white focus:ring-2 focus:ring-sky-500 outline-none"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">E-mail</label>
          <input
            type="email"
            required
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-4 text-white focus:ring-2 focus:ring-sky-500 outline-none"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Senha</label>
          <input
            type="password"
            required
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-4 text-white focus:ring-2 focus:ring-sky-500 outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-sky-950 transition-all active:scale-[0.98]"
        >
          Criar Conta
        </button>
      </form>
    </div>
  );

  const renderRegisterPJ = () => (
    <div className="flex flex-col h-full p-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <button onClick={() => setStep('login')} className="text-slate-400 mb-8 flex items-center gap-2 text-sm font-medium">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        Já tenho conta
      </button>

      <h2 className="text-2xl font-bold text-white mb-2">Cadastre sua empresa</h2>
      <p className="text-slate-400 text-sm mb-8">Encontre talentos locais em minutos.</p>

      <form onSubmit={handleRegister} className="space-y-6">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Nome da Empresa</label>
          <input
            type="text"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-4 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="Ex: Mercado Central"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">E-mail Corporativo</label>
          <input
            type="email"
            required
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-4 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="contato@empresa.com"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Senha</label>
          <input
            type="password"
            required
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-4 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-950 transition-all active:scale-[0.98]"
        >
          Cadastrar Empresa
        </button>
      </form>
    </div>
  );

  return (
    <div className="max-w-md mx-auto h-screen bg-slate-950 text-white overflow-hidden">
      {step === 'user_type' && renderUserType()}
      {step === 'login' && renderLogin()}
      {step === 'register_pf' && renderRegisterPF()}
      {step === 'register_pj' && renderRegisterPJ()}
    </div>
  );
};

export default AuthFlow;
