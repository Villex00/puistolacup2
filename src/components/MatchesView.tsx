import React, { useState } from 'react';
import { Team, Match } from '../types';
import { Calendar, Search, Filter, Radio, Award, AlertCircle } from 'lucide-react';

interface MatchesViewProps {
  teams: Team[];
  matches: Match[];
}

type FilterType = 'all' | 'live' | 'upcoming' | 'played';

export default function MatchesView({ teams, matches }: MatchesViewProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  // Resolve team names
  const getTeamName = (id: string) => {
    const t = teams.find(team => team.id === id);
    return t ? t.name : id;
  };

  const getTeamGroup = (id: string) => {
    const t = teams.find(team => team.id === id);
    return t ? `Lohko ${t.group}` : '';
  };

  // Helper to determine match status
  const getMatchStatus = (match: Match): 'live' | 'played' | 'upcoming' => {
    if (match.live) return 'live';
    const hg = match.hg;
    const ag = match.ag;
    if (hg !== null && hg !== undefined && hg !== '' &&
        ag !== null && ag !== undefined && ag !== '') {
      return 'played';
    }
    return 'upcoming';
  };

  // Filter & Search Matches
  const filteredMatches = matches.filter(match => {
    const status = getMatchStatus(match);
    
    // 1. Status Filter
    if (filter === 'live' && status !== 'live') return false;
    if (filter === 'upcoming' && status !== 'upcoming') return false;
    if (filter === 'played' && status !== 'played') return false;

    // 2. Search filter (team name or field or time)
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      const hName = getTeamName(match.home).toLowerCase();
      const aName = getTeamName(match.away).toLowerCase();
      const fNum = `kenttä ${match.field}`.toLowerCase();
      const timeStr = match.time ? match.time.toLowerCase() : '';
      
      return hName.includes(q) || aName.includes(q) || fNum.includes(q) || timeStr.includes(q);
    }

    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header section with Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#30363d] pb-4">
        <div>
          <span className="font-mono text-2xs font-bold text-[#00c97a] uppercase tracking-widest block">
            Reaaliaikaiset päivitykset • Puistola Cup 2026
          </span>
          <h1 className="font-sans font-extrabold text-2xl text-white mt-1">
            Otteluohjelma & Tulokset
          </h1>
        </div>
        
        {/* Quick status banners */}
        <div className="flex flex-wrap gap-2">
          <div className="bg-[#161b22] border border-[#30363d] px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c97a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00c97a]"></span>
            </span>
            <span className="font-mono text-[10px] text-[#00c97a] font-bold">
              {matches.filter(m => m.live).length} PELIÄ LIVE
            </span>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] px-3 py-1.5 rounded-lg">
            <span className="font-mono text-[10px] text-[#8b949e]">
              KENTÄT 1-2
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-center bg-[#161b22] p-3 rounded-xl border border-[#30363d]">
        {/* Toggle Buttons */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {(['all', 'live', 'upcoming', 'played'] as const).map((type) => {
            const labelFin = {
              all: 'Kaikki',
              live: 'Käynnissä',
              upcoming: 'Tulossa',
              played: 'Pelatut'
            }[type];

            const count = {
              all: matches.length,
              live: matches.filter(m => m.live).length,
              upcoming: matches.filter(m => !m.live && (m.hg === null || m.hg === undefined || m.hg === '')).length,
              played: matches.filter(m => !m.live && m.hg !== null && m.hg !== undefined && m.hg !== '').length
            }[type];

            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                  filter === type
                    ? 'bg-[#00c97a] text-[#0d1117]'
                    : 'bg-neutral-900 text-[#8b949e] hover:text-[#dae3ee] border border-transparent hover:border-[#30363d]'
                }`}
              >
                <span>{labelFin}</span>
                <span className={`px-1.5 py-0.2 rounded font-sans text-3xs ${filter === type ? 'bg-[#00a865] text-[#0d1117] font-extrabold' : 'bg-[#161b22] text-[#8b949e]'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64 max-w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#8b949e]" />
          <input
            type="text"
            placeholder="Hae joukkuetta, kenttää..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-neutral-900 hover:bg-neutral-800/80 focus:bg-neutral-900 border border-[#30363d] text-white rounded-lg text-xs font-sans outline-none focus:border-[#00c97a] focus:ring-1 focus:ring-[#00c97a]/30 transition-colors"
          />
        </div>
      </div>

      {/* Grid of Matches */}
      {filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMatches.map((match) => {
            const status = getMatchStatus(match);
            const isLive = status === 'live';
            const isPlayed = status === 'played';

            return (
              <div 
                key={match.id} 
                className={`border-l-4 rounded-r-xl p-4 flex flex-col justify-between transition-all hover:border-r-[#00c97a] hover:border-y-[#00c97a]/40 shadow-xl ${
                  isLive 
                    ? 'bg-[#11221a] border-l-[#00c97a] border-y border-r border-[#002a18] ring-1 ring-[#00c97a]/15 shadow-[#00c97a]/5' 
                    : isPlayed
                      ? 'bg-[#161b22]/40 border-l-neutral-600 border-y border-r border-[#30363d]/60'
                      : 'bg-[#161b22] border-l-[#30363d] border-y border-r border-[#30363d]'
                }`}
              >
                {/* Card Header (Meta specifications) */}
                <div className="flex justify-between items-start mb-3 border-b border-[#30363d]/50 pb-2">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-[#8b949e] uppercase tracking-wider">
                      {getTeamGroup(match.home) || 'Puistola Cup'} • KENTTÄ {match.field}
                    </span>
                    <span className="font-mono text-xs text-[#00c97a] font-black mt-0.5">
                      KLO {match.time || '14:00'}
                    </span>
                  </div>

                  {/* Badges */}
                  {isLive ? (
                    <span className="bg-[#00c97a]/15 border border-[#00c97a]/30 text-[#00c97a] px-2 py-0.5 rounded font-mono text-[9px] font-bold tracking-tight uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00c97a] animate-pulse"></span>
                      LIVE
                    </span>
                  ) : isPlayed ? (
                    <span className="bg-neutral-800/60 text-[#8b949e] border border-[#30363d] px-2 py-0.5 rounded font-mono text-[9px] font-bold tracking-tight uppercase">
                      LOPPU
                    </span>
                  ) : (
                    <span className="bg-transparent text-[#8b949e] border border-[#30363d]/60 px-2 py-0.5 rounded font-mono text-[9px] font-bold tracking-tight uppercase">
                      TULOSSA
                    </span>
                  )}
                </div>

                {/* Score section */}
                <div className="space-y-3 py-1">
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-grow">
                      <div className="w-6 h-6 rounded bg-neutral-950 border border-neutral-800 flex items-center justify-center font-mono text-[9px] text-[#8b949e] font-extrabold shrink-0 shadow-inner">
                        {getTeamName(match.home).substring(0, 2).toUpperCase()}
                      </div>
                      <span className={`font-sans font-bold text-sm truncate ${isPlayed && (Number(match.hg) < Number(match.ag)) ? 'text-[#8b949e] line-through decoration-[#30363d] text-opacity-70' : 'text-white'}`}>
                        {getTeamName(match.home)}
                      </span>
                    </div>
                    <span className="font-mono text-xl font-bold tracking-tight text-[#00c97a] select-none">
                      {match.hg !== null && match.hg !== undefined && match.hg !== '' ? match.hg : ' - '}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-grow">
                      <div className="w-6 h-6 rounded bg-neutral-950 border border-neutral-800 flex items-center justify-center font-mono text-[9px] text-[#8b949e] font-extrabold shrink-0 shadow-inner">
                        {getTeamName(match.away).substring(0, 2).toUpperCase()}
                      </div>
                      <span className={`font-sans font-bold text-sm truncate ${isPlayed && (Number(match.ag) < Number(match.hg)) ? 'text-[#8b949e] line-through decoration-[#30363d] text-opacity-70' : 'text-white'}`}>
                        {getTeamName(match.away)}
                      </span>
                    </div>
                    <span className="font-mono text-xl font-bold tracking-tight text-[#00c97a] select-none">
                      {match.ag !== null && match.ag !== undefined && match.ag !== '' ? match.ag : ' - '}
                    </span>
                  </div>
                </div>

                {/* Card footer details */}
                <div className="mt-3 pt-2.5 border-t border-[#30363d]/50 flex justify-between items-center text-[10px] text-[#8b949e]">
                  <span className="font-mono">
                    {isLive ? '20 min peli • Kiertävä seuranta' : isPlayed ? 'Ottelu päättynyt' : 'Odottaa ottelun alkua'}
                  </span>
                  {isLive && (
                    <span className="inline-flex items-center gap-1 text-[#00c97a] font-bold">
                      Kentänlaita-päivitykset päällä
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#161b22] border border-dashed border-[#30363d] text-center p-12 rounded-xl text-[#8b949e] space-y-1.5">
          <AlertCircle className="w-8 h-8 text-[#8b949e]/50 mx-auto" />
          <h3 className="font-sans font-extrabold text-white text-sm">Pelejä ei löytynyt</h3>
          <p className="font-sans text-xs max-w-sm mx-auto">
            Ei valittuun suodattimeen tai hakusanaasi "{search}" sopivia otteluita. Kokeile vaihtaa hakua tai suodatinluokkaa.
          </p>
        </div>
      )}
    </div>
  );
}
