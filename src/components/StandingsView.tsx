import React from 'react';
import { Team, Match } from '../types';
import { calculateStandings } from '../utils';
import { ListOrdered, ShieldAlert, Award } from 'lucide-react';

interface StandingsViewProps {
  teams: Team[];
  matches: Match[];
}

export default function StandingsView({ teams, matches }: StandingsViewProps) {
  // calculate standings dynamically
  const groupStandings = calculateStandings(teams, matches);
  const groups = Object.keys(groupStandings).sort();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 border-b border-[#30363d] pb-4 animate-slideDown">
        <div>
          <span className="font-mono text-2xs font-bold text-[#00c97a] uppercase tracking-widest block">
            Tilastokeskus
          </span>
          <h1 className="font-sans font-extrabold text-2xl text-white mt-1">
            Lohkovaiheen Sarjataulukot
          </h1>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1a2d24] border border-[#00c97a]/30 text-[#00c97a] rounded-lg text-xs font-mono font-bold uppercase tracking-tight">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00c97a] animate-pulse"></span>
          <span>Automaattiset päivitykset</span>
        </div>
      </div>

      {groups.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {groups.map((groupKey) => {
            const standings = groupStandings[groupKey];

            return (
              <div 
                key={groupKey} 
                className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden flex flex-col"
              >
                {/* Group Title */}
                <div className="px-4 py-3 border-b border-[#30363d] bg-neutral-900/40 flex justify-between items-center">
                  <h3 className="font-sans font-black text-[#00c97a] uppercase tracking-tight">
                    Lohko {groupKey}
                  </h3>
                  <span className="font-mono text-3xs text-[#8b949e]">
                    PAIKAT: 1-2 JATKOON
                  </span>
                </div>

                {/* Table Container with horizontal scrolling */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="bg-[#1c2128]/40 text-[#8b949e] font-mono text-[10px] uppercase tracking-wider border-b border-[#30363d]">
                        <th className="py-2.5 px-3 w-8 text-center">#</th>
                        <th className="py-2.5 px-3">Joukkue</th>
                        <th className="py-2.5 px-2 text-center w-8">O</th>
                        <th className="py-2.5 px-2 text-center w-8">V</th>
                        <th className="py-2.5 px-2 text-center w-8">T</th>
                        <th className="py-2.5 px-2 text-center w-8">H</th>
                        <th className="py-2.5 px-3 text-center w-20">Maalit</th>
                        <th className="py-2.5 px-2 text-center w-8">ME</th>
                        <th className="py-2.5 px-4 text-right text-[#00c97a] font-bold w-12">P</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#30363d]/40 font-mono text-xs">
                      {standings.map((teamStats, index) => {
                        const rank = index + 1;
                        // highlight top 2 teams (normally passing to playoff stage)
                        const isPromoted = rank <= 2;

                        return (
                          <tr 
                            key={teamStats.teamId} 
                            className={`hover:bg-[#21262d]/50 transition-colors ${
                              isPromoted ? 'bg-[#00c97a]/2' : ''
                            }`}
                          >
                            {/* Rank */}
                            <td className="py-3 px-3 text-center">
                              <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                                isPromoted 
                                  ? 'bg-[#00c97a]/20 text-[#00c97a]' 
                                  : 'bg-neutral-900 text-[#8b949e]'
                              }`}>
                                {rank}
                              </span>
                            </td>

                            {/* Team Name */}
                            <td className="py-3 px-3 font-sans font-extrabold text-[#dae3ee]">
                              {teamStats.name}
                            </td>

                            {/* Played (O) */}
                            <td className="py-3 px-2 text-center text-[#dae3ee]">
                              {teamStats.played}
                            </td>

                            {/* Wins (V) */}
                            <td className="py-3 px-2 text-center text-[#dae3ee]">
                              {teamStats.wins}
                            </td>

                            {/* Draws (T) */}
                            <td className="py-3 px-2 text-center text-[#8b949e]">
                              {teamStats.draws}
                            </td>

                            {/* Losses (H) */}
                            <td className="py-3 px-2 text-center text-[#8b949e]">
                              {teamStats.losses}
                            </td>

                            {/* Goals TM-PM */}
                            <td className="py-3 px-3 text-center text-[#8b949e] tabular-nums">
                              {teamStats.goalsFor} - {teamStats.goalsAgainst}
                            </td>

                            {/* Goal Diff (ME) */}
                            <td className={`py-3 px-2 text-center tabular-nums font-bold ${
                              teamStats.goalDiff > 0 
                                ? 'text-[#00c97a]' 
                                : teamStats.goalDiff < 0 
                                  ? 'text-red-400' 
                                  : 'text-[#8b949e]'
                            }`}>
                              {teamStats.goalDiff > 0 ? `+${teamStats.goalDiff}` : teamStats.goalDiff}
                            </td>

                            {/* Points (P) */}
                            <td className="py-3 px-4 text-right font-black text-[#00c97a] text-sm tabular-nums">
                              {teamStats.points}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#161b22] border border-[#30363d] text-center p-12 rounded-xl text-[#8b949e] space-y-2">
          <ShieldAlert className="w-8 h-8 text-[#8b949e]/50 mx-auto" />
          <h3 className="font-sans font-extrabold text-white text-sm">Joukkueita ei määritetty</h3>
          <p className="font-sans text-xs max-w-sm mx-auto">
            Järjestelmään ei ole vielä syötetty yhtään joukkuetta lohkojakoineen. Voit luoda joukkueita ja alustaa tiedot helposti ylläpitosivulta!
          </p>
        </div>
      )}

      {/* Legend Card */}
      <div className="bg-[#141c24] border border-[#30363d] p-4 rounded-xl flex flex-wrap gap-x-6 gap-y-2 text-[#8b949e] font-sans text-2xs uppercase tracking-wide">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-[#00c97a]">O</span>
          <span>= Ottelut</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-[#00c97a]">V</span>
          <span>= Voitot</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-[#00c97a]">T</span>
          <span>= Tasapelit</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-[#00c97a]">H</span>
          <span>= Häviöt</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-[#00c97a]">Maalit</span>
          <span>= Tehdyt maalit - Päästetyt maalit</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-[#00c97a]">ME</span>
          <span>= Maaliero</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-[#00c97a]">P</span>
          <span>= Pisteet (Voitto: 3, tasapeli: 1, häviö: 0)</span>
        </div>
      </div>
    </div>
  );
}
