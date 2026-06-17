import React, { useState } from 'react';
import { Team, Match, PlayoffMatch, Sponsor, Settings } from '../types';
import { rtdb } from '../firebase';
import { ref, set, push, remove, update } from 'firebase/database';
import { 
  DEFAULT_TEAMS, 
  DEFAULT_MATCHES, 
  DEFAULT_PLAYOFFS, 
  DEFAULT_SPONSORIT, 
  DEFAULT_SETTINGS 
} from '../seeder';
import { 
  Key, ShieldCheck, Eye, EyeOff, Save, Trash2, Plus, 
  ToggleLeft, ToggleRight, RotateCcw, PenTool, Radio, ClipboardList 
} from 'lucide-react';

interface AdminViewProps {
  teams: Team[];
  matches: Match[];
  playoffs: PlayoffMatch[];
  sponsors: Sponsor[];
  settings?: Settings;
}

type AdminSubTab = 'teams' | 'matches' | 'playoffs' | 'sponsors' | 'settings';

export default function AdminView({ teams, matches, playoffs, sponsors, settings }: AdminViewProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('puistola_cup_admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<AdminSubTab>('matches');

  // Form States
  // 1. Team states
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamGroup, setNewTeamGroup] = useState('A');

  // 2. Match states
  const [newMatchHome, setNewMatchHome] = useState('');
  const [newMatchAway, setNewMatchAway] = useState('');
  const [newMatchTime, setNewMatchTime] = useState('12:00');
  const [newMatchField, setNewMatchField] = useState<number | string>(1);

  // 3. Sponsor states
  const [spName, setSpName] = useState('');
  const [spLogo, setSpLogo] = useState('');
  const [spUrl, setSpUrl] = useState('');
  const [spTier, setSpTier] = useState<'main' | 'partner'>('main');

  // 4. Settings inputs
  const [setRules, setSetRules] = useState(settings?.rules || '');
  const [setIntro, setSetIntro] = useState(settings?.sponsorsIntro || '');
  const [setFooter, setSetFooter] = useState(settings?.footerText || '');

  // Handle Login Check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Mussalonkala99!') {
      setIsAuthenticated(true);
      setAuthError(false);
      sessionStorage.setItem('puistola_cup_admin_auth', 'true');
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('puistola_cup_admin_auth');
  };

  // 1. TEAMS LOGIC
  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;

    const teamsRef = ref(rtdb, 'puistolacup/teams');
    const newTeamRef = push(teamsRef);
    set(newTeamRef, {
      name: newTeamName.trim(),
      group: newTeamGroup
    }).then(() => {
      setNewTeamName('');
    });
  };

  const handleDeleteTeam = (id: string) => {
    if (window.confirm('Haluatko varmasti poistaa tämän joukkueen?')) {
      const teamRef = ref(rtdb, `puistolacup/teams/${id}`);
      remove(teamRef);
    }
  };

  // 2. MATCHES LOGIC
  const handleAddMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMatchHome || !newMatchAway || newMatchHome === newMatchAway) {
      alert('Valitse kaksi eri joukkuetta!');
      return;
    }

    const matchesRef = ref(rtdb, 'puistolacup/matches');
    const newMatchRef = push(matchesRef);
    set(newMatchRef, {
      home: newMatchHome,
      away: newMatchAway,
      time: newMatchTime,
      field: Number(newMatchField),
      live: false,
      hg: '',
      ag: ''
    }).then(() => {
      setNewMatchHome('');
      setNewMatchAway('');
    });
  };

  const handleDeleteMatch = (id: string) => {
    if (window.confirm('Poistetaanko tämä ottelu kokonaan kalenterista?')) {
      const matchRef = ref(rtdb, `puistolacup/matches/${id}`);
      remove(matchRef);
    }
  };

  const handleUpdateMatchScore = (id: string, homeGoals: any, awayGoals: any) => {
    const matchRef = ref(rtdb, `puistolacup/matches/${id}`);
    update(matchRef, {
      hg: homeGoals === '' || homeGoals === null ? '' : Number(homeGoals),
      ag: awayGoals === '' || awayGoals === null ? '' : Number(awayGoals)
    });
  };

  const handleToggleMatchLive = (id: string, currentLive: boolean) => {
    const matchRef = ref(rtdb, `puistolacup/matches/${id}`);
    update(matchRef, {
      live: !currentLive
    });
  };

  // 3. PLAYOFFS LOGIC
  const handleUpdatePlayoffScore = (id: string, hg: any, ag: any) => {
    const pRef = ref(rtdb, `puistolacup/playoffs/${id}`);
    update(pRef, {
      hg: hg === '' || hg === null ? '' : Number(hg),
      ag: ag === '' || ag === null ? '' : Number(ag)
    });
  };

  const handleUpdatePlayoffTeams = (id: string, home: string, away: string) => {
    const pRef = ref(rtdb, `puistolacup/playoffs/${id}`);
    update(pRef, {
      home: home.trim(),
      away: away.trim()
    });
  };

  const handleTogglePlayoffLive = (id: string, currentLive: boolean) => {
    const pRef = ref(rtdb, `puistolacup/playoffs/${id}`);
    update(pRef, {
      live: !currentLive
    });
  };

  // 4. SPONSORS LOGIC
  const handleAddSponsor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spName.trim()) return;

    const sponsorsRef = ref(rtdb, 'puistolacup/sponsors');
    const newSponsorRef = push(sponsorsRef);
    set(newSponsorRef, {
      name: spName.trim(),
      logoUrl: spLogo.trim(),
      url: spUrl.trim() || 'https://www.kotka.fi',
      tier: spTier
    }).then(() => {
      setSpName('');
      setSpLogo('');
      setSpUrl('');
    });
  };

  const handleDeleteSponsor = (id: string) => {
    if (window.confirm('Poistetaanko tämä sponsori?')) {
      const spRef = ref(rtdb, `puistolacup/sponsors/${id}`);
      remove(spRef);
    }
  };

  // 5. SETTINGS LOGIC
  const handleSaveSettings = () => {
    const settingsRef = ref(rtdb, 'puistolacup/settings');
    set(settingsRef, {
      rules: setRules || DEFAULT_SETTINGS.rules,
      sponsorsIntro: setIntro || DEFAULT_SETTINGS.sponsorsIntro,
      footerText: setFooter || DEFAULT_SETTINGS.footerText
    }).then(() => {
      alert('Asetukset ja säännöt tallennettu reaaliaikaiseen tietokantaan!');
    });
  };

  // ONE-CLICK DATABASE SEEDING
  const handleSeedDatabase = () => {
    if (window.confirm('Tämä korvaa nykyiset tiedot valmiilla testiaineistolla (8 joukkuetta, 10 peliä, sponsorit, säännöt). Jatketaanko?')) {
      // 1. Seed teams
      const teamsRef = ref(rtdb, 'puistolacup/teams');
      const teamsObj: Record<string, any> = {};
      DEFAULT_TEAMS.forEach(t => {
        teamsObj[t.id] = { name: t.name, group: t.group };
      });
      set(teamsRef, teamsObj);

      // 2. Seed matches
      const matchesRef = ref(rtdb, 'puistolacup/matches');
      const matchesObj: Record<string, any> = {};
      DEFAULT_MATCHES.forEach(m => {
        matchesObj[m.id] = {
          home: m.home,
          away: m.away,
          hg: m.hg,
          ag: m.ag,
          time: m.time,
          field: m.field,
          live: m.live
        };
      });
      set(matchesRef, matchesObj);

      // 3. Seed playoffs
      const playoffsRef = ref(rtdb, 'puistolacup/playoffs');
      const playoffsObj: Record<string, any> = {};
      DEFAULT_PLAYOFFS.forEach(p => {
        playoffsObj[p.id] = {
          id: p.id,
          round: p.round,
          home: p.home,
          away: p.away,
          hg: p.hg,
          ag: p.ag,
          time: p.time,
          field: p.field,
          live: p.live
        };
      });
      set(playoffsRef, playoffsObj);

      // 4. Seed sponsors
      const sponsorsRef = ref(rtdb, 'puistolacup/sponsors');
      const sponsorsObj: Record<string, any> = {};
      DEFAULT_SPONSORIT.forEach(s => {
        sponsorsObj[s.id] = {
          name: s.name,
          logoUrl: s.logoUrl,
          url: s.url,
          tier: s.tier
        };
      });
      set(sponsorsRef, sponsorsObj);

      // 5. Seed settings
      const settingsRef = ref(rtdb, 'puistolacup/settings');
      set(settingsRef, DEFAULT_SETTINGS);

      // Reset loaded textareas
      setSetRules(DEFAULT_SETTINGS.rules);
      setSetIntro(DEFAULT_SETTINGS.sponsorsIntro);
      setSetFooter(DEFAULT_SETTINGS.footerText);

      alert('Tietokanta alustettu ja täytetty onnistuneesti! Kaikki sivut päivittyivät livenä.');
    }
  };

  // Non-authenticated pass verification rendering
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60dvh] animate-fadeIn">
        <div className="w-full max-w-sm bg-[#161b22] border border-[#30363d] p-6 md:p-8 rounded-xl space-y-6">
          <div className="text-center space-y-1">
            <h1 className="font-sans font-black text-[#00c97a] tracking-tight uppercase text-lg">
              PuistolaCup ylläpito
            </h1>
            <p className="text-xs text-[#8b949e] font-mono">KIRJAUDU HALLINTAPANEELIIN</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-2xs font-mono font-bold uppercase text-[#8b949e]">Salasana</label>
              <input
                type="password"
                required
                placeholder="Kirjoita salasana..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-[#0d1117] border ${
                  authError ? 'border-red-500' : 'border-[#30363d]'
                } focus:border-[#00c97a] text-xs font-mono rounded-lg p-3 outline-none text-white transition-colors`}
              />
              {authError && (
                <p className="text-2xs font-sans text-red-500 font-semibold mt-1">Virheellinen salasana! Yritä uudelleen.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#00c97a] hover:bg-[#00b06a] text-[#0d1117] font-mono font-extrabold uppercase rounded-lg text-xs tracking-wider transition-transform active:scale-95"
            >
              Kirjaudu Sisään
            </button>
          </form>

          <div className="border-t border-[#30363d] pt-4 text-center">
            <p className="text-3xs text-[#8b949e] font-mono uppercase">Vinkki: salasana löytyy turnauksen ohjekansiosta.</p>
          </div>
        </div>
      </div>
    );
  }

  // Render administrator view tabs
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Admin Title Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 border-b border-[#30363d] pb-4 bg-neutral-900/10 p-3 rounded-lg border border-[#30363d]/50">
        <div>
          <span className="font-mono text-2xs font-extrabold text-[#00c97a] uppercase tracking-widest block">
            PuistolaCup ohjauspaneeli
          </span>
          <h1 className="font-sans font-black text-2xl text-white mt-0.5">
            Turnauksen Hallintasivu
          </h1>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={handleSeedDatabase}
            className="px-3 py-1.5 bg-[#00c97a]/10 hover:bg-[#00c97a]/20 border border-[#00c97a]/40 text-[#00c97a] font-mono text-[10px] font-bold uppercase rounded-lg transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Alusta / Täytä default data
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-[#161b22] hover:bg-neutral-800 text-[#dae3ee] border border-[#30363d] font-mono text-[10px] font-bold uppercase rounded-lg transition-colors"
          >
            Kirjaudu ulos
          </button>
        </div>
      </div>

      {/* Internal Navigation Sub tabs */}
      <div className="flex flex-wrap border-b border-[#30363d] gap-1">
        {(['matches', 'teams', 'playoffs', 'sponsors', 'settings'] as const).map(tab => {
          const tabLabel = {
            matches: 'Ottelutulokset',
            teams: 'Joukkueet & Lohkot',
            playoffs: 'Pudotuspeli',
            sponsors: 'Kumppanit',
            settings: 'Sivuston säädöt & Säännöt'
          }[tab];

          return (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-4 py-2 border-b-2 font-sans text-xs font-bold transition-all uppercase ${
                activeSubTab === tab
                  ? 'border-[#00c97a] text-[#00c97a]'
                  : 'border-transparent text-[#8b949e] hover:text-[#dae3ee]'
              }`}
            >
              {tabLabel}
            </button>
          );
        })}
      </div>

      {/* View Switch Case contents */}

      {/* 1. MATCHES AND RESULTS TABS */}
      {activeSubTab === 'matches' && (
        <div className="space-y-6">
          {/* Add Match Form */}
          <div className="bg-[#161b22] border border-[#30363d] p-5 rounded-xl space-y-4">
            <h3 className="font-sans font-extrabold text-sm text-[#00c97a] uppercase tracking-wide">
              Luo uusi lohko-ottelu
            </h3>
            <form onSubmit={handleAddMatch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="text-3xs font-mono font-bold uppercase text-[#8b949e] block mb-1">Koti-joukkue</label>
                <select
                  required
                  value={newMatchHome}
                  onChange={(e) => setNewMatchHome(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#00c97a] text-xs font-sans rounded-lg p-2.5 outline-none text-white"
                >
                  <option value="">-- Valitse --</option>
                  {teams.map(t => (
                    <option key={t.id} value={t.id}>{t.name} (Lohko {t.group})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-3xs font-mono font-bold uppercase text-[#8b949e] block mb-1">Vieras-joukkue</label>
                <select
                  required
                  value={newMatchAway}
                  onChange={(e) => setNewMatchAway(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#00c97a] text-xs font-sans rounded-lg p-2.5 outline-none text-white"
                >
                  <option value="">-- Valitse --</option>
                  {teams.map(t => (
                    <option key={t.id} value={t.id}>{t.name} (Lohko {t.group})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-3xs font-mono font-bold uppercase text-[#8b949e] block mb-1">Klo aika</label>
                  <input
                    type="text"
                    required
                    placeholder="12:00"
                    value={newMatchTime}
                    onChange={(e) => setNewMatchTime(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#00c97a] text-xs font-sans rounded-lg p-2.5 text-center text-white"
                  />
                </div>
                <div>
                  <label className="text-3xs font-mono font-bold uppercase text-[#8b949e] block mb-1">Kenttä (1/2)</label>
                  <select
                    value={newMatchField}
                    onChange={(e) => setNewMatchField(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#00c97a] text-xs font-sans rounded-lg p-2.5 text-white"
                  >
                    <option value={1}>Kenttä 1</option>
                    <option value={2}>Kenttä 2</option>
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#00c97a] hover:bg-[#00b06a] text-[#0d1117] font-mono font-bold uppercase rounded-lg text-xs"
                >
                  Lisää ottelu kalenteriin
                </button>
              </div>
            </form>
          </div>

          {/* Matches List Grid with Direct inputs to change score instantaneously */}
          <div className="space-y-4">
            <h3 className="font-sans font-bold text-sm text-white uppercase tracking-wider">
              Muokkaa otteluita, tuloksia ja live-tilaa
            </h3>
            {matches.length > 0 ? (
              <div className="space-y-3">
                {matches.map((match) => {
                  const homeName = teams.find(t => t.id === match.home)?.name || match.home;
                  const awayName = teams.find(t => t.id === match.away)?.name || match.away;

                  return (
                    <div 
                      key={match.id} 
                      className="bg-[#161b22] border border-[#30363d] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex flex-col">
                        <span className="font-mono text-3xs text-[#8b949e] uppercase">
                          Klo {match.time} • Kaukalo {match.field}
                        </span>
                        <span className="font-sans font-extrabold text-sm text-white">
                          {homeName} vs {awayName}
                        </span>
                      </div>

                      {/* Editing Scores Inputs */}
                      <div className="flex items-center gap-2">
                        <span className="text-3xs text-[#8b949e] font-mono uppercase">Maalit (Koti-Vieras):</span>
                        <input
                          type="number"
                          placeholder="K"
                          value={match.hg ?? ''}
                          onChange={(e) => handleUpdateMatchScore(match.id, e.target.value, match.ag)}
                          className="w-12 bg-[#0d1117] border border-[#30363d] focus:border-[#00c97a] text-xs font-mono font-bold rounded p-1.5 text-center text-[#dae3ee] outline-none"
                        />
                        <span className="text-[#8b949e] font-bold">:</span>
                        <input
                          type="number"
                          placeholder="V"
                          value={match.ag ?? ''}
                          onChange={(e) => handleUpdateMatchScore(match.id, match.hg, e.target.value)}
                          className="w-12 bg-[#0d1117] border border-[#30363d] focus:border-[#00c97a] text-xs font-mono font-bold rounded p-1.5 text-center text-[#dae3ee] outline-none"
                        />
                      </div>

                      {/* Live Toggling and Control buttons */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleMatchLive(match.id, match.live)}
                          className={`px-3 py-1.5 rounded-lg border text-3xs font-mono font-bold uppercase transition-all flex items-center gap-1 ${
                            match.live
                              ? 'bg-[#00c97a]/20 border-[#00c97a]/40 text-[#00c97a]'
                              : 'bg-transparent border-[#30363d] text-[#8b949e] hover:border-[#8b949e]'
                          }`}
                        >
                          <Radio className={`w-3 h-3 ${match.live ? 'animate-pulse' : ''}`} />
                          <span>{match.live ? 'LIVE päällä' : 'Aseta livenä'}</span>
                        </button>

                        <button
                          onClick={() => handleDeleteMatch(match.id)}
                          className="p-2 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg group transition-colors"
                          title="Poista ottelu listalta"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center font-mono text-xs text-[#8b949e] py-8 border border-dashed border-[#30363d] rounded-xl">
                Ei otteluita järjestelmässä. Klikkaa ylhäältä alusta default data täyttääksesi otteluita.
              </p>
            )}
          </div>
        </div>
      )}

      {/* 2. TEAMS AND GROUPS MANAGEMENT */}
      {activeSubTab === 'teams' && (
        <div className="space-y-6">
          {/* Add Team Panel */}
          <div className="bg-[#161b22] border border-[#30363d] p-5 rounded-xl space-y-4">
            <h3 className="font-sans font-bold text-sm text-[#00c97a] uppercase tracking-wide">
              Rekisteröi uusi turnausjoukkue
            </h3>
            <form onSubmit={handleAddTeam} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="text-3xs font-mono font-bold uppercase text-[#8b949e] block mb-1">Joukkueen nimi</label>
                <input
                  type="text"
                  required
                  placeholder="Esim. Puistolan Urheilijat"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#00c97a] text-xs font-sans rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-3xs font-mono font-bold uppercase text-[#8b949e] block mb-1">Alkusarjan lohko</label>
                <select
                  value={newTeamGroup}
                  onChange={(e) => setNewTeamGroup(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#00c97a] text-xs font-sans rounded-lg p-2.5 text-white"
                >
                  <option value="A">Lohko A</option>
                  <option value="B">Lohko B</option>
                  <option value="C">Lohko C</option>
                  <option value="D">Lohko D</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#00c97a] hover:bg-[#00b06a] text-[#0d1117] font-mono font-bold uppercase rounded-lg text-xs"
                >
                  Luo joukkue
                </button>
              </div>
            </form>
          </div>

          {/* Teams list */}
          <div className="space-y-4">
            <h3 className="font-sans font-bold text-sm text-white uppercase tracking-wider">
              Rekisteröidyt joukkueet ({teams.length} kpl)
            </h3>
            {teams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {teams.map((t) => (
                  <div 
                    key={t.id} 
                    className="bg-[#161b22] border border-[#30363d] p-3.5 rounded-xl flex justify-between items-center group hover:border-[#8b949e] transition-all"
                  >
                    <div>
                      <p className="font-sans font-extrabold text-white text-sm">{t.name}</p>
                      <span className="font-mono text-3xs text-[#8b949e] uppercase">
                        Sijoitus: Lohko {t.group}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteTeam(t.id)}
                      className="p-1 text-red-500/50 hover:text-red-400 group-hover:block rounded bg-[#0d1117] border border-[#30363d]/50 hover:border-red-500/20"
                      title="Poista joukkue"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center font-mono text-xs text-[#8b949e] py-8 border border-dashed border-[#30363d] rounded-xl">
                Ei rekisteröityjä joukkueita tallennettuna.
              </p>
            )}
          </div>
        </div>
      )}

      {/* 3. PLAYOFFS TABS */}
      {activeSubTab === 'playoffs' && (
        <div className="space-y-6">
          <div className="space-y-3 bg-[#161b22] p-4 rounded-xl border border-[#30363d]">
            <h3 className="font-sans font-bold text-sm text-[#00c97a] uppercase mb-1">Playoffs Hallinta</h3>
            <p className="text-2xs text-[#8b949e] font-sans pb-2">
              Playoffs-nodes (Puolivälierät, välierät, finaali) luodaan seederillä tai manuaalisti. Alla voi kirjoittaa joukkueidit, textikenttämääreet ja kuluvan pelin livenä/tuloksen.
            </p>
          </div>

          {playoffs.length > 0 ? (
            <div className="space-y-4">
              {playoffs.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-[#161b22] border border-[#30363d] p-4 rounded-xl flex flex-col lg:flex-row gap-4 justify-between lg:items-center"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-3xs text-[#8b949e] uppercase font-bold">
                      ID: {item.id} • Kiekka: {item.round}
                    </span>
                    {/* Inline name fields */}
                    <div className="flex flex-wrap gap-2">
                      <input
                        type="text"
                        value={item.home || ''}
                        placeholder="Vieras / e.g. team_1"
                        onChange={(e) => handleUpdatePlayoffTeams(item.id, e.target.value, item.away)}
                        className="bg-[#0d1117] border border-[#30363d] text-xs font-sans p-1.5 rounded text-white w-40"
                      />
                      <span className="text-neutral-500 font-bold self-center">vs</span>
                      <input
                        type="text"
                        value={item.away || ''}
                        placeholder="Koti / e.g. team_2"
                        onChange={(e) => handleUpdatePlayoffTeams(item.id, item.home, e.target.value)}
                        className="bg-[#0d1117] border border-[#30363d] text-xs font-sans p-1.5 rounded text-white w-40"
                      />
                    </div>
                  </div>

                  {/* Playoff goals editing */}
                  <div className="flex items-center gap-2">
                    <span className="text-3xs text-[#8b949e] font-mono">Maalit:</span>
                    <input
                      type="number"
                      placeholder="H"
                      value={item.hg ?? ''}
                      onChange={(e) => handleUpdatePlayoffScore(item.id, e.target.value, item.ag)}
                      className="w-10 bg-[#0d1117] border border-[#30363d] text-xs font-mono font-bold rounded p-1 text-center text-white"
                    />
                    <span className="text-neutral-500 font-bold">:</span>
                    <input
                      type="number"
                      placeholder="A"
                      value={item.ag ?? ''}
                      onChange={(e) => handleUpdatePlayoffScore(item.id, item.hg, e.target.value)}
                      className="w-10 bg-[#0d1117] border border-[#30363d] text-xs font-mono font-bold rounded p-1 text-center text-white"
                    />
                  </div>

                  {/* Toggling live */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTogglePlayoffLive(item.id, !!item.live)}
                      className={`px-3 py-1 bg-neutral-900 border text-3xs font-mono font-bold uppercase rounded transition-colors ${
                        item.live ? 'border-[#00c97a] text-[#00c97a]' : 'border-[#30363d] text-[#8b949e]'
                      }`}
                    >
                      {item.live ? 'LIVE PÄÄLLÄ' : 'SET LIVE'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center font-mono text-xs text-[#8b949e] py-8 border border-dashed border-[#30363d] rounded-xl">
              Ei playoffs-solmuja luotuna. Klikkaa ylhäältä keltaista default alustuspainiketta.
            </p>
          )}
        </div>
      )}

      {/* 4. SPONSORS EDITING PANEL */}
      {activeSubTab === 'sponsors' && (
        <div className="space-y-6">
          {/* Add Sponsor Form */}
          <div className="bg-[#161b22] border border-[#30363d] p-5 rounded-xl space-y-4">
            <h3 className="font-sans font-bold text-sm text-[#00c97a] uppercase tracking-wide">
              Rekisteröi uusi kumppani tai pääsponsori
            </h3>
            <form onSubmit={handleAddSponsor} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-3xs font-mono font-bold uppercase text-[#8b949e] block mb-1">Yrityksen nimi</label>
                  <input
                    type="text"
                    required
                    placeholder="Esim. Mussalon Kalakauppa"
                    value={spName}
                    onChange={(e) => setSpName(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#00c97a] text-xs font-sans rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-3xs font-mono font-bold uppercase text-[#8b949e] block mb-1">Sponsoritaso</label>
                  <select
                    value={spTier}
                    onChange={(e) => setSpTier(e.target.value as any)}
                    className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#00c97a] text-xs font-sans rounded-lg p-2.5 text-white"
                  >
                    <option value="main">Pääsponsori (Isolla ylhäällä)</option>
                    <option value="partner">Kumppani (Pienemmällä alhaalla)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-3xs font-mono font-bold uppercase text-[#8b949e] block mb-1">Logo URL (valinnainen)</label>
                  <input
                    type="text"
                    placeholder="https://example.com/logo.png"
                    value={spLogo}
                    onChange={(e) => setSpLogo(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#00c97a] text-xs font-sans rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-3xs font-mono font-bold uppercase text-[#8b949e] block mb-1">Kotisivu Linkki (ulkoviisuhaku)</label>
                  <input
                    type="text"
                    placeholder="https://www.kotka.fi"
                    value={spUrl}
                    onChange={(e) => setSpUrl(e.target.value)}
                    className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#00c97a] text-xs font-sans rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 bg-[#00c97a] hover:bg-[#00b06a] text-[#0d1117] font-mono font-bold uppercase rounded-lg text-xs"
                >
                  Tallenna sponsori
                </button>
              </div>
            </form>
          </div>

          {/* Sponsors grid list with delete buttons */}
          <div className="space-y-4">
            <h3 className="font-sans font-bold text-sm text-white uppercase tracking-wider">
              Nykyiset kumppanit listana
            </h3>
            {sponsors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sponsors.map((sp) => (
                  <div 
                    key={sp.id} 
                    className="bg-[#161b22] border border-[#30363d] p-3.5 rounded-xl flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-900 border border-[#30363d] rounded flex items-center justify-center p-1 text-[8px] font-mono text-[#8b949e]">
                        {sp.logoUrl ? 'LOGO' : 'EI LOGOA'}
                      </div>
                      <div>
                        <h4 className="font-sans font-extrabold text-white text-sm">{sp.name}</h4>
                        <span className="font-mono text-3xs text-[#8b949e] uppercase">
                          Taso: {sp.tier === 'main' ? 'PÄÄSPONSORI' : 'KUMPPANI'} • {sp.url}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteSponsor(sp.id)}
                      className="p-1.5 text-red-500/50 hover:text-red-400 rounded-lg hover:bg-neutral-800 transition-colors"
                      title="Poista kumppani"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center font-mono text-xs text-[#8b949e] py-8 border border-dashed border-[#30363d] rounded-xl">
                Ei syötettyjä sponsoreita.
              </p>
            )}
          </div>
        </div>
      )}

      {/* 5. SETTINGS EDITING PANEL */}
      {activeSubTab === 'settings' && (
        <div className="bg-[#161b22] border border-[#30363d] p-5 rounded-xl space-y-6">
          <h3 className="font-sans font-bold text-sm text-[#00c97a] uppercase tracking-wide">
            Muokkaa sivuston tekstejä ja turnaussääntöjä
          </h3>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-3xs font-mono font-bold uppercase text-[#8b949e] block">Turnaussäännöt (Structured rules)</label>
              <textarea
                rows={12}
                value={setRules}
                onChange={(e) => setSetRules(e.target.value)}
                placeholder="Kirjoita säännöt tähän..."
                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#00c97a] text-xs font-sans p-3 rounded-lg outline-none text-white whitespace-pre-line leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-3xs font-mono font-bold uppercase text-[#8b949e] block">Sponsoreiden esittelyteksti</label>
              <input
                type="text"
                value={setIntro}
                onChange={(e) => setSetIntro(e.target.value)}
                placeholder="Kiitos kumppaneille..."
                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#00c97a] text-xs font-sans p-2.5 rounded-lg text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-3xs font-mono font-bold uppercase text-[#8b949e] block">Alareunan (Footer) teksti</label>
              <input
                type="text"
                value={setFooter}
                onChange={(e) => setSetFooter(e.target.value)}
                placeholder="PuistolaCup 2026 Kotka..."
                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#00c97a] text-xs font-sans p-2.5 rounded-lg text-white"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSaveSettings}
                className="px-6 py-2.5 bg-[#00c97a] hover:bg-[#00b06a] text-[#0d1117] font-mono font-bold uppercase rounded-lg text-xs tracking-wide flex items-center justify-center gap-1.5 transition-transform active:scale-95"
              >
                <Save className="w-4 h-4" />
                Tallenna ohjelmaparametrit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
