import React from 'react';
import { Home, Calendar, ListOrdered, GitFork, BookOpen, Settings } from 'lucide-react';

interface FooterProps {
  footerText?: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Footer({ footerText, activeTab, setActiveTab }: FooterProps) {
  return (
    <footer className="w-full mt-auto bg-[#141c24] border-t border-[#30363d] pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand details */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-extrabold tracking-tighter text-md uppercase text-[#00c97a]">
            PuistolaCup 2026
          </span>
          <p className="text-xs text-[#8b949e]">
            {footerText || '© 2026 PuistolaCup. Athletic, Precise, Urgent.'}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <button onClick={() => setActiveTab('rules')} className="text-xs text-[#8b949e] hover:text-[#00c97a] transition-colors">
            Yleissäännöt
          </button>
          <button onClick={() => setActiveTab('sponsors')} className="text-xs text-[#8b949e] hover:text-[#00c97a] transition-colors">
            Sponsorit
          </button>
          <button onClick={() => setActiveTab('admin')} className="text-xs text-[#8b949e] hover:text-[#00c97a] transition-colors">
            Hallinta
          </button>
        </div>
      </div>

      {/* Floating Bottom Nav for Mobile Only */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-[#161b22]/95 backdrop-blur-md border-t border-[#30363d] flex justify-around items-center py-2 px-1 z-50 shadow-2xl">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center p-1 font-mono text-[9px] font-bold tracking-tight uppercase transition-all duration-150 ${
            activeTab === 'home' ? 'text-[#00c97a] scale-105' : 'text-[#8b949e]'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Livenä</span>
        </button>

        <button
          onClick={() => setActiveTab('matches')}
          className={`flex flex-col items-center justify-center p-1 font-mono text-[9px] font-bold tracking-tight uppercase transition-all duration-150 ${
            activeTab === 'matches' ? 'text-[#00c97a] scale-105' : 'text-[#8b949e]'
          }`}
        >
          <Calendar className="w-5 h-5 mb-0.5" />
          <span>Ottelut</span>
        </button>

        <button
          onClick={() => setActiveTab('standings')}
          className={`flex flex-col items-center justify-center p-1 font-mono text-[9px] font-bold tracking-tight uppercase transition-all duration-150 ${
            activeTab === 'standings' ? 'text-[#00c97a] scale-105' : 'text-[#8b949e]'
          }`}
        >
          <ListOrdered className="w-5 h-5 mb-0.5" />
          <span>Taulukot</span>
        </button>

        <button
          onClick={() => setActiveTab('bracket')}
          className={`flex flex-col items-center justify-center p-1 font-mono text-[9px] font-bold tracking-tight uppercase transition-all duration-150 ${
            activeTab === 'bracket' ? 'text-[#00c97a] scale-105' : 'text-[#8b949e]'
          }`}
        >
          <GitFork className="w-5 h-5 mb-0.5" />
          <span>Kaavio</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center justify-center p-1 font-mono text-[9px] font-bold tracking-tight uppercase transition-all duration-150 ${
            activeTab === 'admin' ? 'text-[#00c97a] scale-105' : 'text-[#8b949e]'
          }`}
        >
          <Settings className="w-5 h-5 mb-0.5" />
          <span>Ylläpito</span>
        </button>
      </nav>
    </footer>
  );
}
