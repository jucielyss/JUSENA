
import React from 'react';

interface HeaderProps {
  viewMode: 'map' | 'list';
  setViewMode: (mode: 'map' | 'list') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  unreadNotifications: number;
  onOpenNotifications: () => void;
}

const Header: React.FC<HeaderProps> = ({ viewMode, setViewMode, searchQuery, setSearchQuery, unreadNotifications, onOpenNotifications }) => {
  return (
    <header className="bg-slate-950 border-b border-slate-900 p-4 space-y-3 z-10 shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-500 flex items-center gap-1">
          <span className="bg-blue-600 text-white p-1 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M7 7h10M7 12h10M7 17h10" />
            </svg>
          </span>
          Fácil Zipe
        </h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenNotifications}
            className="relative p-2 bg-slate-900 rounded-xl text-slate-400 active:scale-90 transition-all border border-slate-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-slate-950">
                {unreadNotifications}
              </span>
            )}
          </button>
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
            <button 
              onClick={() => setViewMode('map')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${viewMode === 'map' ? 'bg-slate-800 text-blue-400 shadow-sm' : 'text-slate-500'}`}
            >
              Mapa
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-800 text-blue-400 shadow-sm' : 'text-slate-500'}`}
            >
              Lista
            </button>
          </div>
        </div>
      </div>
      <div className="relative">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="O que você está procurando?" 
          className="w-full bg-slate-900 border-none rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all border border-slate-800"
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3.5 top-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </header>
  );
};

export default Header;
