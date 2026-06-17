import { Team, Match } from './types';

export interface TeamStats {
  teamId: string;
  name: string;
  group: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
}

export function calculateStandings(teams: Team[], matches: Match[]): Record<string, TeamStats[]> {
  const statsMap: Record<string, TeamStats> = {};

  // Initialize stats for all teams
  teams.forEach(team => {
    statsMap[team.id] = {
      teamId: team.id,
      name: team.name,
      group: team.group || 'A',
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDiff: 0,
      points: 0
    };
  });

  // Process matches
  matches.forEach(match => {
    // Only include matches that have scores entered
    const hgVal = match.hg;
    const agVal = match.ag;

    if (hgVal !== null && hgVal !== undefined && hgVal !== '' &&
        agVal !== null && agVal !== undefined && agVal !== '') {
      
      const homeGoals = typeof hgVal === 'string' ? parseInt(hgVal, 10) : hgVal;
      const awayGoals = typeof agVal === 'string' ? parseInt(agVal, 10) : agVal;

      if (!isNaN(homeGoals) && !isNaN(awayGoals)) {
        const homeStats = statsMap[match.home];
        const awayStats = statsMap[match.away];

        // Ensure teams exist in our standings map before updating
        if (homeStats && awayStats) {
          homeStats.played += 1;
          awayStats.played += 1;
          homeStats.goalsFor += homeGoals;
          homeStats.goalsAgainst += awayGoals;
          awayStats.goalsFor += awayGoals;
          awayStats.goalsAgainst += homeGoals;

          if (homeGoals > awayGoals) {
            homeStats.wins += 1;
            homeStats.points += 3;
            awayStats.losses += 1;
          } else if (homeGoals < awayGoals) {
            awayStats.wins += 1;
            awayStats.points += 3;
            homeStats.losses += 1;
          } else {
            homeStats.draws += 1;
            homeStats.points += 1;
            awayStats.draws += 1;
            awayStats.points += 1;
          }
        }
      }
    }
  });

  // Calculate goal differences and group by keys
  const groups: Record<string, TeamStats[]> = {};

  Object.values(statsMap).forEach(stats => {
    stats.goalDiff = stats.goalsFor - stats.goalsAgainst;
    const gr = stats.group;
    if (!groups[gr]) {
      groups[gr] = [];
    }
    groups[gr].push(stats);
  });

  // Sort each group's standings
  Object.keys(groups).forEach(groupName => {
    groups[groupName].sort((a, b) => {
      // 1. Points (descending)
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      // 2. Goal difference (descending)
      if (b.goalDiff !== a.goalDiff) {
        return b.goalDiff - a.goalDiff;
      }
      // 3. Goals For (descending)
      if (b.goalsFor !== a.goalsFor) {
        return b.goalsFor - a.goalsFor;
      }
      // 4. Alphabetical by name (ascending)
      return a.name.localeCompare(b.name);
    });
  });

  return groups;
}
