
import React from 'react';
import { AppNotification } from '../types';

interface NotificationsProps {
  notifications: AppNotification[];
  onBack: () => void;
  onMarkRead: (id: string) => void;
  onClearAll: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ notifications, onBack, onMarkRead, onClearAll }) => {
  return (
    <div className="absolute inset-0 bg-slate-950 z-[60] flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      <header className="p-6 border-b border-slate-900 flex justify-between items-center bg-slate-950/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-slate-400 p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-xl font-bold text-white">Notificações</h1>
        </div>
        {notifications.length > 0 && (
          <button onClick={onClearAll} className="text-xs font-bold text-slate-500 uppercase">Limpar</button>
        )}
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar pb-20">
        {notifications.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-40 text-center px-10">
            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-800">
              <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
            <p className="text-sm font-medium">Tudo em dia! Nenhuma nova notificação por enquanto.</p>
          </div>
        ) : (
          notifications.map(notif => (
            <div 
              key={notif.id}
              onClick={() => onMarkRead(notif.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${notif.read ? 'bg-slate-900/40 border-slate-900' : 'bg-slate-900 border-slate-800 shadow-lg'}`}
            >
              {!notif.read && (
                <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
              )}
              <div className="flex gap-4">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                  notif.type === 'job_alert' ? 'bg-amber-900/20 text-amber-500' : 
                  notif.type === 'application_received' ? 'bg-emerald-900/20 text-emerald-500' : 
                  'bg-blue-900/20 text-blue-500'
                }`}>
                  {notif.type === 'job_alert' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                  {notif.type === 'application_received' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                  {notif.type === 'profile_view' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white mb-1">{notif.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-2">{notif.message}</p>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{notif.timestamp}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
