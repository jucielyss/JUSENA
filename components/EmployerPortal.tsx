
import React, { useState } from 'react';
import { Job } from '../types';
import { geminiService } from '../services/gemini';

interface EmployerPortalProps {
  jobs: Job[];
  onAddJob: (job: Job) => void;
}

const EmployerPortal: React.FC<EmployerPortalProps> = ({ jobs, onAddJob }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'shop' as any,
    salary: '',
    shift: 'flexible' as any,
    description: ''
  });

  const generateWithAi = async () => {
    if (!formData.title) return alert("Digite o cargo primeiro!");
    setLoadingAi(true);
    const desc = await geminiService.generateJobDescription(formData.title, formData.type);
    setFormData({ ...formData, description: desc });
    setLoadingAi(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      company: 'Minha Loja',
      companyType: formData.type,
      salary: formData.salary || 'A combinar',
      shift: formData.shift,
      distance: 0,
      location: { lat: 0, lng: 0, address: 'Rua do Comércio, 10' },
      description: formData.description,
      requirements: ['Responsabilidade', 'Bom atendimento'],
      createdAt: new Date().toISOString()
    };
    onAddJob(newJob);
    setIsAdding(false);
    setFormData({ title: '', type: 'shop', salary: '', shift: 'flexible', description: '' });
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 pb-24 bg-slate-950">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-100">Minhas Vagas</h2>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-emerald-600 text-white p-2 rounded-full shadow-lg active:scale-90 transition-transform"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
        </button>
      </div>

      {isAdding ? (
        <div className="bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-800 animate-in fade-in zoom-in duration-200">
          <h3 className="text-lg font-bold text-slate-100 mb-4">Nova Vaga</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cargo</label>
              <input 
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Ex: Balconista, Repositor..."
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 outline-none text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Salário</label>
                <input 
                  value={formData.salary}
                  onChange={e => setFormData({...formData, salary: e.target.value})}
                  placeholder="R$ 1.500"
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 outline-none text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tipo</label>
                <select 
                   value={formData.type}
                   onChange={e => setFormData({...formData, type: e.target.value as any})}
                   className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 outline-none text-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="shop">Loja</option>
                  <option value="market">Mercado</option>
                  <option value="restaurant">Restaurante</option>
                  <option value="bakery">Padaria</option>
                </select>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Descrição</label>
                <button 
                  type="button"
                  onClick={generateWithAi}
                  disabled={loadingAi}
                  className="text-[10px] font-bold text-emerald-500 flex items-center gap-1 hover:underline"
                >
                  {loadingAi ? 'Gerando...' : '✨ Sugerir com IA'}
                </button>
              </div>
              <textarea 
                required
                rows={4}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Descreva o que o funcionário fará..."
                className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 outline-none text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button 
                type="button"
                onClick={() => setIsAdding(false)}
                className="flex-1 py-3 text-slate-500 font-bold"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="flex-[2] bg-emerald-600 text-white font-bold py-3 rounded-2xl shadow-lg shadow-emerald-950"
              >
                Publicar Vaga
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.filter(j => j.company === 'Minha Loja').map(job => (
            <div key={job.id} className="bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-800 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-100">{job.title}</h4>
                <p className="text-xs text-slate-600">{new Date(job.createdAt).toLocaleDateString()}</p>
                <div className="mt-2 flex gap-2">
                    <span className="text-[10px] bg-emerald-950/40 text-emerald-400 font-bold px-2 py-0.5 rounded">3 Candidatos</span>
                </div>
              </div>
              <button className="h-10 w-10 bg-slate-950 rounded-xl flex items-center justify-center text-slate-600 border border-slate-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          ))}
          {jobs.filter(j => j.company === 'Minha Loja').length === 0 && (
             <div className="text-center py-12 px-6">
                <div className="w-20 h-20 bg-emerald-900/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="text-slate-600 text-sm">Você ainda não postou nenhuma vaga. Toque no + para começar.</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployerPortal;
