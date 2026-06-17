import React from 'react';
import { Team, Match, Sponsor } from '../types';
import { Activity, Radio, ArrowRight, Calendar, Star, AlertTriangle, ShieldAlert } from 'lucide-react';

interface HomeViewProps {
  teams: Team[];
  matches: Match[];
  sponsors: Sponsor[];
  sponsorsIntro?: string;
  setActiveTab: (tab: string) => void;
}

export default function HomeView({ teams, matches, sponsors, sponsorsIntro, setActiveTab }: HomeViewProps) {
  // Resolve team names
  const getTeamName = (id: string) => {
    const t = teams.find(team => team.id === id);
    return t ? t.name : id; // fallback if text exists
  };

  const getTeamGroup = (id: string) => {
    const t = teams.find(team => team.id === id);
    return t ? `Lohko ${t.group}` : '';
  };

  // Live matches (up to 2 cards, field 1 vs field 2)
  const f1Live = matches.find(m => m.live && String(m.field) === '1');
  const f2Live = matches.find(m => m.live && String(m.field) === '2');

  // fallback to first and second live match if not mapped to fields explicitly
  const liveMatches = matches.filter(m => m.live);
  const liveCard1 = f1Live || liveMatches[0];
  const liveCard2 = f2Live || (liveCard1?.id !== liveMatches[1]?.id ? liveMatches[1] : null);

  // Upcoming matches (limited list, sorted chronologically/logically if they are not live and scores are empty)
  const upcomingMatches = matches
    .filter(m => !m.live && (m.hg === null || m.hg === undefined || m.hg === ''))
    .slice(0, 4);

  // Sponsor lists
  const mainSponsors = sponsors.filter(s => s.tier === 'main');
  const partnerSponsors = sponsors.filter(s => s.tier === 'partner');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner / Atmosphere */}
      <section className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#161b22] via-[#0f141d] to-[#0a0e14] border border-[#30363d] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 z-10 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c97a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00c97a]"></span>
            </span>
            <span className="font-mono text-xs font-bold uppercase text-[#00c97a] tracking-widest">
              Puistola Cup 4.7.2026
            </span>
          </div>
          <h1 className="font-sans font-extrabold text-2xl md:text-3xl text-white tracking-tight leading-tight">
            Seuraa Turnausta Reaaliajassa!
          </h1>
          <p className="font-sans text-xs md:text-sm text-[#8b949e]">
            Kaksi kaukaloa, non-stop 7v7 höntsäotteluita, 20 minuuttia per peli suoralla seurannalla laidalta. Kaikki tilastot päivittyvät sekunneissa.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 z-10 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('matches')}
            className="w-full sm:w-auto px-4 py-2 bg-[#00c97a] text-[#0d1117] hover:bg-[#00b06a] font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-md shadow-[#00c97a]/15"
          >
            Selaa Otteluita <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveTab('standings')}
            className="w-full sm:w-auto px-4 py-2 bg-[#161b22] border border-[#30363d] text-[#dae3ee] hover:bg-[#21262d] hover:border-[#8b949e] font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            Sarjataulukko
          </button>
        </div>
      </section>

      {/* Real-time Match Cards Section (Strictly grid 2 columns even on mobile as required) */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-sans font-bold text-sm tracking-wider uppercase text-[#dae3ee] flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#00c97a] animate-pulse" />
            Live Seuranta
          </h2>
          <span className="font-mono text-[10px] text-[#8b949e] uppercase border border-[#30363d] px-2 py-0.5 rounded-full bg-neutral-900/40">
            KENTTÄ 1 & 2
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {/* Card 1 - Field 1 */}
          <div className={`p-3 md:p-5 border-l-4 rounded-r-xl transition-all relative overflow-hidden flex flex-col justify-between shadow-xl ${
            liveCard1 
              ? 'bg-[#11221a] border-l-[#00c97a] border-y border-r border-[#002a18] ring-1 ring-[#00c97a]/15 shadow-[#00c97a]/5' 
              : 'bg-[#161b22] border-l-[#30363d] border-y border-r border-[#30363d]'
          }`}>
            <div className="flex justify-between items-center mb-2 md:mb-4">
              <span className="font-mono text-[9px] md:text-2xs font-bold text-[#8b949e] uppercase tracking-wider block">
                KENTTÄ 1 
              </span>
              {liveCard1 ? (
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00c97a]/20 border border-[#00c97a]/30 animate-pulse">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c97a] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00c97a]"></span>
                  </span>
                  <span className="font-mono text-[8px] md:text-[9px] text-[#00c97a] font-extrabold uppercase tracking-tight">LIVE</span>
                </div>
              ) : (
                <span className="font-mono text-[8px] md:text-[9px] px-2 py-0.5 rounded-full bg-neutral-900 text-[#8b949e] border border-[#30363d]">TAUOTETTU</span>
              )}
            </div>

            {liveCard1 ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-grow">
                    <div className="w-7 h-7 rounded bg-neutral-950 border border-[#00c97a]/20 flex items-center justify-center font-mono text-[10px] text-[#00c97a] font-extrabold shrink-0 shadow-inner">
                      {getTeamName(liveCard1.home).substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-sans font-extrabold text-xs md:text-sm text-white truncate">
                      {getTeamName(liveCard1.home)}
                    </span>
                  </div>
                  <span className="font-mono text-lg md:text-2xl font-black text-[#00c97a] leading-none shrink-0 pl-1">
                    {liveCard1.hg ?? 0}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-grow">
                    <div className="w-7 h-7 rounded bg-neutral-950 border border-[#00c97a]/20 flex items-center justify-center font-mono text-[10px] text-[#00c97a] font-extrabold shrink-0 shadow-inner">
                      {getTeamName(liveCard1.away).substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-sans font-extrabold text-xs md:text-sm text-white truncate">
                      {getTeamName(liveCard1.away)}
                    </span>
                  </div>
                  <span className="font-mono text-lg md:text-2xl font-black text-[#00c97a] leading-none shrink-0 pl-1">
                    {liveCard1.ag ?? 0}
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center">
                <p className="font-mono text-[10px] md:text-xs text-[#8b949e]">Ei käynnissä olevaa peliä kentällä 1</p>
              </div>
            )}

            <div className="mt-3 pt-2 border-t border-[#30363d] flex justify-between items-center">
              <span className="font-mono text-[8px] md:text-[10px] text-[#8b949e] uppercase">
                {liveCard1 ? getTeamGroup(liveCard1.home) || 'Karsintavaihe' : 'Seuraava tulossa'}
              </span>
              {liveCard1 && (
                <span className="font-mono text-[9px] text-[#00c97a] font-bold">20 min peli</span>
              )}
            </div>
          </div>

          {/* Card 2 - Field 2 */}
          <div className={`p-3 md:p-5 border-l-4 rounded-r-xl transition-all relative overflow-hidden flex flex-col justify-between shadow-xl ${
            liveCard2 
              ? 'bg-[#11221a] border-l-[#00c97a] border-y border-r border-[#002a18] ring-1 ring-[#00c97a]/15 shadow-[#00c97a]/5' 
              : 'bg-[#161b22] border-l-[#30363d] border-y border-r border-[#30363d]'
          }`}>
            <div className="flex justify-between items-center mb-2 md:mb-4">
              <span className="font-mono text-[9px] md:text-2xs font-bold text-[#8b949e] uppercase tracking-wider block">
                KENTTÄ 2 
              </span>
              {liveCard2 ? (
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00c97a]/20 border border-[#00c97a]/30 animate-pulse">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c97a] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00c97a]"></span>
                  </span>
                  <span className="font-mono text-[8px] md:text-[9px] text-[#00c97a] font-extrabold uppercase tracking-tight">LIVE</span>
                </div>
              ) : (
                <span className="font-mono text-[8px] md:text-[9px] px-2 py-0.5 rounded-full bg-neutral-900 text-[#8b949e] border border-[#30363d]">TAUOTETTU</span>
              )}
            </div>

            {liveCard2 ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-grow">
                    <div className="w-7 h-7 rounded bg-neutral-950 border border-[#00c97a]/20 flex items-center justify-center font-mono text-[10px] text-[#00c97a] font-extrabold shrink-0 shadow-inner">
                      {getTeamName(liveCard2.home).substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-sans font-extrabold text-xs md:text-sm text-white truncate">
                      {getTeamName(liveCard2.home)}
                    </span>
                  </div>
                  <span className="font-mono text-lg md:text-2xl font-black text-[#00c97a] leading-none shrink-0 pl-1">
                    {liveCard2.hg ?? 0}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-grow">
                    <div className="w-7 h-7 rounded bg-neutral-950 border border-[#00c97a]/20 flex items-center justify-center font-mono text-[10px] text-[#00c97a] font-extrabold shrink-0 shadow-inner">
                      {getTeamName(liveCard2.away).substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-sans font-extrabold text-xs md:text-sm text-white truncate">
                      {getTeamName(liveCard2.away)}
                    </span>
                  </div>
                  <span className="font-mono text-lg md:text-2xl font-black text-[#00c97a] leading-none shrink-0 pl-1">
                    {liveCard2.ag ?? 0}
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center">
                <p className="font-mono text-[10px] md:text-xs text-[#8b949e]">Ei käynnissä olevaa peliä kentällä 2</p>
              </div>
            )}

            <div className="mt-3 pt-2 border-t border-[#30363d] flex justify-between items-center">
              <span className="font-mono text-[8px] md:text-[10px] text-[#8b949e] uppercase">
                {liveCard2 ? getTeamGroup(liveCard2.home) || 'Karsintavaihe' : 'Seuraava tulossa'}
              </span>
              {liveCard2 && (
                <span className="font-mono text-[9px] text-[#00c97a] font-bold">20 min peli</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grid: Upcoming Matches & Fast Info Bento Column */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seuraavat Tulevat Ottelut Listana */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#00c97a]" />
            <h2 className="font-sans font-bold text-sm tracking-wider uppercase text-[#dae3ee]">
              Seuraavat tulevat ottelut
            </h2>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden divide-y divide-[#30363d]">
            {upcomingMatches.length > 0 ? (
              upcomingMatches.map((match) => (
                <div 
                  key={match.id} 
                  className="p-4 hover:bg-[#21262d] transition-all flex justify-between items-center gap-4 group"
                >
                  <div className="flex items-center gap-3">
                    {/* Time badge */}
                    <div className="bg-neutral-900 border border-[#30363d] px-2.5 py-1 rounded-lg text-center font-mono text-xs text-[#00c97a] font-bold shrink-0">
                      KLO {match.time || '15:00'}
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2 text-xs text-[#8b949e] font-mono">
                        <span>KENTTÄ {match.field}</span>
                        <span>•</span>
                        <span>{getTeamGroup(match.home) || 'Puistola Cup'}</span>
                      </div>
                      <div className="font-sans font-extrabold text-[#dae3ee] text-sm group-hover:text-[#00c97a] transition-colors">
                        {getTeamName(match.home)} vs {getTeamName(match.away)}
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-2xs uppercase text-[#8b949e] px-2 py-0.5 rounded border border-[#30363d] shrink-0 align-middle">
                    Tulossa
                  </span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-[#8b949e] text-xs font-mono">
                Ei tulevia lohko-otteluita järjestelmässä. Syötä pelejä hallintasivulta!
              </div>
            )}
          </div>
          <button 
            onClick={() => setActiveTab('matches')} 
            className="w-full py-2.5 bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] hover:border-[#8b949e] text-xs font-mono font-bold tracking-wider uppercase text-[#8b949e] hover:text-[#dae3ee] rounded-xl transition-all"
          >
            Näytä Kaikki Ottelut ({matches.length} kpl)
          </button>
        </div>

        {/* Informatiivinen sivupaneeli */}
        <div className="space-y-4">
          <h2 className="font-sans font-bold text-sm tracking-wider uppercase text-[#dae3ee]">
            Lohkotilanne lyhyesti
          </h2>

          <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3">
            <h3 className="font-sans font-extrabold text-sm text-[#00c97a] flex items-center justify-between border-b border-[#30363d] pb-2">
              <span>Lohkojako</span>
              <span className="font-mono text-2xs font-normal text-[#8b949e]">14 JOUKKUETTA</span>
            </h3>
            <div className="space-y-4 pt-1">
              <div>
                <h4 className="font-mono text-2xs font-bold text-[#8b949e] uppercase mb-1.5">Lohko A</h4>
                <div className="flex flex-wrap gap-1">
                  {teams.filter(t => t.group === 'A').map(t => (
                    <span key={t.id} className="text-2xs font-sans font-medium px-2 py-1 rounded bg-[#0d1117] border border-[#30363d] text-[#dae3ee]">
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-mono text-2xs font-bold text-[#8b949e] uppercase mb-1.5">Lohko B</h4>
                <div className="flex flex-wrap gap-1">
                  {teams.filter(t => t.group === 'B').map(t => (
                    <span key={t.id} className="text-2xs font-sans font-medium px-2 py-1 rounded bg-[#0d1117] border border-[#30363d] text-[#dae3ee]">
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('standings')}
              className="mt-4 w-full py-2 bg-[#00c97a]/10 hover:bg-[#00c97a]/20 text-[#00c97a] transition-all text-xs font-mono font-bold uppercase rounded-lg text-center block"
            >
              KATSO SARJATAULUKOT
            </button>
          </div>
        </div>
      </section>

      {/* Sponsorit (Pääsponsorit isona, kumppanit pienempänä) */}
      <section className="pt-6 border-t border-[#30363d]">
        <div className="text-center space-y-2 mb-6">
          <span className="font-mono text-[9px] font-bold text-[#00c97a] uppercase tracking-widest block">
            LÄMMIN KIITOS TUKIJOILLEMME
          </span>
          <h2 className="font-sans font-extrabold text-lg text-white">Yhteistyössä PuistolaCupissa</h2>
          <p className="text-xs text-[#8b949e] max-w-xl mx-auto">
            {sponsorsIntro || 'Kiitos kumppaneillemme, jotka mahdollistavat vuotuisen höntsäfutiksen riemun Puistolan kentällä.'}
          </p>
        </div>

        {/* Pääsponsorit isolla */}
        {mainSponsors.length > 0 && (
          <div className="mb-6">
            <h3 className="text-center font-mono text-[10px] text-[#8b949e] uppercase tracking-widest mb-4">Pääyhteistyökumppanit</h3>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 bg-[#161b22] p-6 rounded-xl border border-[#30363d]">
              {mainSponsors.map(sp => (
                <a 
                  key={sp.id} 
                  href={sp.url} 
                  target="_blank" 
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2 hover:scale-105 transition-all text-center"
                >
                  {sp.logoUrl ? (
                    <img 
                      src={sp.logoUrl} 
                      alt={sp.name} 
                      className="h-10 md:h-12 w-auto object-contain bg-slate-900/60 p-2 rounded border border-[#30363d]"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="h-10 md:h-12 w-28 bg-[#0d1117] flex items-center justify-center rounded font-sans font-extrabold text-[#00c97a] border border-[#30363d] uppercase tracking-wider text-xs p-2">
                      {sp.name}
                    </div>
                  )}
                  <span className="font-sans text-2xs font-extrabold text-[#dae3ee] group-hover:text-[#00c97a]">
                    {sp.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Kumppanit pienemmällä */}
        {partnerSponsors.length > 0 && (
          <div>
            <h3 className="text-center font-mono text-[10px] text-[#8b949e] uppercase tracking-widest mb-4">Kumppanit</h3>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 p-4 bg-transparent border border-dashed border-[#30363d] rounded-xl">
              {partnerSponsors.map(sp => (
                <a 
                  key={sp.id} 
                  href={sp.url} 
                  target="_blank" 
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 hover:opacity-80 transition-all text-center"
                >
                  {sp.logoUrl ? (
                    <img 
                      src={sp.logoUrl} 
                      alt={sp.name} 
                      className="h-6 md:h-8 w-auto object-contain rounded opacity-75 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="font-mono text-2xs border border-[#30363d] px-2 py-1 rounded bg-[#161b22] text-[#8b949e]">
                      {sp.name}
                    </span>
                  )}
                  <span className="font-sans text-2xs text-[#8b949e] group-hover:text-white transition-colors">
                    {sp.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
