import React from 'react';
import { Trophy, Settings, Calendar, Award, BookOpen, ShieldCheck, HelpCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadCount?: number;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#161b22] border-b border-[#30363d] shadow-lg">
      <div className="flex justify-between items-center px-4 md:px-8 h-16 max-w-7xl mx-auto">
        {/* Brand / Title Logo */}
        <div 
          onClick={() => setActiveTab('home')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="bg-[#00c97a] p-1.5 rounded-md text-[#0d1117] group-hover:scale-105 transition-transform">
            <Trophy className="w-5 h-5 font-bold" />
          </div>
          <span className="font-sans font-extrabold tracking-tighter text-xl text-[#00c97a] uppercase">
            PuistolaCup
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold tracking-wider uppercase transition-all ${
              activeTab === 'home'
                ? 'bg-[#00c97a]/10 text-[#00c97a]'
                : 'text-[#8b949e] hover:text-[#dae3ee] hover:bg-neutral-800/40'
            }`}
          >
            Livenä
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold tracking-wider uppercase transition-all ${
              activeTab === 'matches'
                ? 'bg-[#00c97a]/10 text-[#00c97a]'
                : 'text-[#8b949e] hover:text-[#dae3ee] hover:bg-neutral-800/40'
            }`}
          >
            Ottelut
          </button>
          <button
            onClick={() => setActiveTab('standings')}
            className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold tracking-wider uppercase transition-all ${
              activeTab === 'standings'
                ? 'bg-[#00c97a]/10 text-[#00c97a]'
                : 'text-[#8b949e] hover:text-[#dae3ee] hover:bg-neutral-800/40'
            }`}
          >
            Sarjataulukko
          </button>
          <button
            onClick={() => setActiveTab('bracket')}
            className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold tracking-wider uppercase transition-all ${
              activeTab === 'bracket'
                ? 'bg-[#00c97a]/10 text-[#00c97a]'
                : 'text-[#8b949e] hover:text-[#dae3ee] hover:bg-neutral-800/40'
            }`}
          >
            Kaavio
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold tracking-wider uppercase transition-all ${
              activeTab === 'rules'
                ? 'bg-[#00c97a]/10 text-[#00c97a]'
                : 'text-[#8b949e] hover:text-[#dae3ee] hover:bg-neutral-800/40'
            }`}
          >
            Säännöt
          </button>
          <button
            onClick={() => setActiveTab('sponsors')}
            className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold tracking-wider uppercase transition-all ${
              activeTab === 'sponsors'
                ? 'bg-[#00c97a]/10 text-[#00c97a]'
                : 'text-[#8b949e] hover:text-[#dae3ee] hover:bg-neutral-800/40'
            }`}
          >
            Sponsorit
          </button>
        </nav>

        {/* Right side - Admin link */}
        <div className="flex items-center gap-2">
          {/* Quick link button to admin */}
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-mono font-bold tracking-wider uppercase transition-all ${
              activeTab === 'admin'
                ? 'bg-[#00c97a] border-[#00c97a] text-[#0d1117]'
                : 'bg-transparent border-[#30363d] text-[#8b949e] hover:border-[#8b949e] hover:text-[#dae3ee]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Ylläpito</span>
          </button>
        </div>
      </div>
    </header>
  );
}
