import React from 'react';
import { Team, PlayoffMatch } from '../types';
import { GitFork, ShieldCheck, Trophy, HelpCircle } from 'lucide-react';

interface BracketViewProps {
  teams: Team[];
  playoffs: PlayoffMatch[];
}

export default function BracketView({ teams, playoffs }: BracketViewProps) {
  // Helpers to resolve team name if it matches team ID or display custom text
  const getTeamName = (id: string) => {
    if (!id) return 'Tulossa...';
    const t = teams.find(team => team.id === id);
    return t ? t.name : id; // fallback to text e.g. "A1 voittaja"
  };

  // Find standard seeds
  const getMatch = (id: string, round: 'qf' | 'sf' | 'final'): PlayoffMatch => {
    const m = playoffs.find(item => item.id === id);
    if (m) return m;
    // return a blank playoff match if none found in real database to preserve the visual layouts
    return {
      id,
      round,
      home: 'Sijoittamaton',
      away: 'Sijoittamaton',
      hg: null,
      ag: null,
      live: false,
      time: '16:00',
      field: 1
    };
  };

  const qf1 = getMatch('qf_1', 'qf');
  const qf2 = getMatch('qf_2', 'qf');
  const qf3 = getMatch('qf_3', 'qf');
  const qf4 = getMatch('qf_4', 'qf');

  const sf1 = getMatch('sf_1', 'sf');
  const sf2 = getMatch('sf_2', 'sf');

  const finalMatch = getMatch('final', 'final');

  // Match details rendering card helper
  const renderMatchCard = (match: PlayoffMatch, title: string) => {
    const isPlayed = match.hg !== null && match.hg !== undefined && match.hg !== '' &&
                     match.ag !== null && match.ag !== undefined && match.ag !== '';
    const isLive = match.live;

    const homeGoals = Number(match.hg);
    const awayGoals = Number(match.ag);

    const isHomeWinner = isPlayed && homeGoals > awayGoals;
    const isAwayWinner = isPlayed && awayGoals > homeGoals;

    return (
      <div 
        className={`bg-[#161b22] border rounded-xl p-3.5 w-64 shadow-md transition-all hover:border-[#00c97a] relative shrink-0 ${
          isLive 
            ? 'border-[#00c97a] ring-1 ring-[#00c97a]/35' 
            : 'border-[#30363d]'
        }`}
      >
        <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-[#30363d]/50">
          <span className="font-mono text-3xs text-[#8b949e] uppercase font-bold tracking-wider">
            {title} • KENTTÄ {match.field || 1}
          </span>
          {isLive ? (
            <span className="bg-[#00c97a]/15 border border-[#00c97a]/30 text-[#00c97a] px-1.5 py-0.2 rounded font-mono text-[8px] font-bold uppercase tracking-tight flex items-center gap-1">
              <span className="w-1 h-1 rounded bg-[#00c97a] animate-pulse"></span>LIVE
            </span>
          ) : isPlayed ? (
            <span className="bg-neutral-800 text-[#8b949e] px-1.5 py-0.2 rounded font-mono text-[8px] font-bold">LOPPUTULOS</span>
          ) : (
            <span className="font-mono text-[9px] text-[#00c97a]/80 font-bold">{match.time || '16:00'}</span>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center gap-2">
            <span className={`font-sans text-xs truncate max-w-[80%] ${
              isPlayed && !isHomeWinner ? 'text-[#8b949e]' : 'text-white font-extrabold'
            }`}>
              {getTeamName(match.home)}
            </span>
            <span className="font-mono text-sm font-black text-[#00c97a] tabular-nums">
              {match.hg !== null && match.hg !== undefined && match.hg !== '' ? match.hg : '-'}
            </span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className={`font-sans text-xs truncate max-w-[80%] ${
              isPlayed && !isAwayWinner ? 'text-[#8b949e]' : 'text-white font-extrabold'
            }`}>
              {getTeamName(match.away)}
            </span>
            <span className="font-mono text-sm font-black text-[#00c97a] tabular-nums">
              {match.ag !== null && match.ag !== undefined && match.ag !== '' ? match.ag : '-'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Title */}
      <div className="border-b border-[#30363d] pb-4 animate-slideDown">
        <span className="font-mono text-2xs font-bold text-[#00c97a] uppercase tracking-widest block">
          Pudotuspelit • Puistola Cup 2026
        </span>
        <h1 className="font-sans font-extrabold text-2xl text-white mt-1 uppercase flex items-center gap-2">
          <GitFork className="w-6 h-6 text-[#00c97a] shrink-0" />
          Pudotuspelikaavio
        </h1>
        <p className="text-xs text-[#8b949e] mt-1 max-w-xl">
          Puolivälieristä finaaliin. Tasapelin sattuessa pudotuspeleissä voittaja ratkaistaan suoraan kolmen vetäjän rangaistuspotkukilpailulla.
        </p>
      </div>

      {/* Visual Bracket Container - horizontal scrolling on small viewports */}
      <div className="overflow-x-auto pb-6 pt-2 select-none no-scrollbar">
        <div className="flex gap-12 items-center min-w-[900px] justify-between px-2 relative">
          
          {/* Column 1: Quarterfinals */}
          <div className="flex flex-col gap-6 justify-between h-[520px]">
            <h3 className="text-center font-mono text-[10px] text-[#8b949e] uppercase tracking-wider border-b border-[#30363d] pb-1">
              Puolivälierät
            </h3>
            <div className="flex flex-col gap-4">
              {renderMatchCard(qf1, 'QF 1')}
              {renderMatchCard(qf2, 'QF 2')}
            </div>
            <div className="flex flex-col gap-4">
              {renderMatchCard(qf3, 'QF 3')}
              {renderMatchCard(qf4, 'QF 4')}
            </div>
          </div>

          {/* Connectors lines between QF & SF (CSS stylized) */}
          <div className="hidden md:flex flex-col justify-around h-[520px] shrink-0 text-center font-bold text-xs text-neutral-800">
            <span className="bg-[#30363d] h-0.5 w-6 block self-center rounded-full"></span>
            <span className="bg-[#30363d] h-0.5 w-6 block self-center rounded-full"></span>
          </div>

          {/* Column 2: Semifinals */}
          <div className="flex flex-col justify-around h-[520px]">
            <div>
              <h3 className="text-center font-mono text-[10px] text-[#8b949e] uppercase tracking-wider border-b border-[#30363d] pb-1 mb-10">
                Välierät
              </h3>
              <div className="flex flex-col gap-24">
                {renderMatchCard(sf1, 'VÄLIERÄ 1')}
                {renderMatchCard(sf2, 'VÄLIERÄ 2')}
              </div>
            </div>
          </div>

          {/* Connector lines between SF & Final */}
          <div className="hidden md:flex flex-col justify-around h-[520px] shrink-0 text-center text-[#30363d] font-bold">
            <span className="bg-[#30363d] h-0.5 w-6 block self-center rounded-full"></span>
          </div>

          {/* Column 3: The Grand Final Node */}
          <div className="flex flex-col justify-center h-[520px]">
            <h3 className="text-center font-mono text-[10px] text-[#00c97a] uppercase tracking-widest border-b border-[#00c97a]/30 pb-1 mb-8">
              Finaali
            </h3>
            <div className="relative scale-105 bg-gradient-to-br from-[#161b22] to-[#132d20] border-2 border-[#00c97a]/60 rounded-xl p-5 shadow-2xl w-72">
              <div className="absolute top-0 right-0 p-3">
                <Trophy className="w-5 h-5 text-[#00c97a] animate-bounce" />
              </div>
              <div className="text-2xs font-mono font-bold text-[#8b949e] uppercase tracking-widest pb-1.5 border-b border-[#30363d] mb-4">
                🏆 KULTAOTTELU • KLO {finalMatch.time || '19:30'}
              </div>

              <div className="space-y-3 pb-2">
                <div className="flex justify-between items-center gap-2">
                  <span className="font-sans font-extrabold text-sm text-white truncate max-w-[70%]">
                    {getTeamName(finalMatch.home)}
                  </span>
                  <span className="font-mono text-lg font-black text-[#00c97a] tabular-nums">
                    {finalMatch.hg !== null && finalMatch.hg !== undefined && finalMatch.hg !== '' ? finalMatch.hg : '-'}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="font-sans font-extrabold text-sm text-white truncate max-w-[70%]">
                    {getTeamName(finalMatch.away)}
                  </span>
                  <span className="font-mono text-lg font-black text-[#00c97a] tabular-nums">
                    {finalMatch.ag !== null && finalMatch.ag !== undefined && finalMatch.ag !== '' ? finalMatch.ag : '-'}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#30363d] text-center">
                <span className="font-mono text-[9px] text-[#00c97a] font-bold uppercase tracking-wider">
                  Puistola Cup Voitaja 2026
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
