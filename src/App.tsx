import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import MatchesView from './components/MatchesView';
import StandingsView from './components/StandingsView';
import BracketView from './components/BracketView';
import RulesView from './components/RulesView';
import SponsorsView from './components/SponsorsView';
import AdminView from './components/AdminView';

import { ref, onValue } from 'firebase/database';
import { rtdb } from './firebase';
import { Team, Match, PlayoffMatch, Sponsor, Settings } from './types';
import { 
  DEFAULT_TEAMS, 
  DEFAULT_MATCHES, 
  DEFAULT_PLAYOFFS, 
  DEFAULT_SPONSORIT, 
  DEFAULT_SETTINGS 
} from './seeder';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // Real-time Database states
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [playoffs, setPlayoffs] = useState<PlayoffMatch[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [settings, setSettings] = useState<Settings | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // Subscribe to Firebase Realtime Database updates on mount
  useEffect(() => {
    // 1. Subscribe to Teams
    const teamsRef = ref(rtdb, 'puistolacup/teams');
    const unsubTeams = onValue(teamsRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        const list = Object.entries(val).map(([key, item]: [string, any]) => ({
          id: key,
          ...item
        }));
        setTeams(list);
      } else {
        // Fallback locally during uninitialized database states
        setTeams(DEFAULT_TEAMS);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase teams connection failure: ", error);
      setTeams(DEFAULT_TEAMS);
      setLoading(false);
    });

    // 2. Subscribe to Matches
    const matchesRef = ref(rtdb, 'puistolacup/matches');
    const unsubMatches = onValue(matchesRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        const list = Object.entries(val).map(([key, item]: [string, any]) => ({
          id: key,
          ...item
        }));
        // Sort chronologically by game time
        list.sort((a, b) => (a.time || '').localeCompare(b.time || ''));
        setMatches(list);
      } else {
        setMatches(DEFAULT_MATCHES);
      }
    }, (error) => {
      console.error("Firebase matches connection failure: ", error);
      setMatches(DEFAULT_MATCHES);
    });

    // 3. Subscribe to Playoffs
    const playoffsRef = ref(rtdb, 'puistolacup/playoffs');
    const unsubPlayoffs = onValue(playoffsRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        const list = Object.entries(val).map(([key, item]: [string, any]) => ({
          id: key,
          ...item
        }));
        setPlayoffs(list);
      } else {
        setPlayoffs(DEFAULT_PLAYOFFS);
      }
    }, (error) => {
      console.error("Firebase playoffs connection failure: ", error);
      setPlayoffs(DEFAULT_PLAYOFFS);
    });

    // 4. Subscribe to Sponsors
    const sponsorsRef = ref(rtdb, 'puistolacup/sponsors');
    const unsubSponsors = onValue(sponsorsRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        const list = Object.entries(val).map(([key, item]: [string, any]) => ({
          id: key,
          ...item
        }));
        setSponsors(list);
      } else {
        setSponsors(DEFAULT_SPONSORIT);
      }
    }, (error) => {
      console.error("Firebase sponsors connection failure: ", error);
      setSponsors(DEFAULT_SPONSORIT);
    });

    // 5. Subscribe to Settings
    const settingsRef = ref(rtdb, 'puistolacup/settings');
    const unsubSettings = onValue(settingsRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        setSettings(val);
      } else {
        setSettings(DEFAULT_SETTINGS);
      }
    }, (error) => {
      console.error("Firebase settings connection failure: ", error);
      setSettings(DEFAULT_SETTINGS);
    });

    return () => {
      unsubTeams();
      unsubMatches();
      unsubPlayoffs();
      unsubSponsors();
      unsubSettings();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#dae3ee] flex flex-col font-sans antialiased">
      {/* Visual Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container Canvas */}
      <main className="flex-grow pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full transition-all duration-300">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[50dvh] space-y-3 animate-pulse">
            <div className="w-10 h-10 border-4 border-[#00c97a] border-t-transparent rounded-full animate-spin"></div>
            <p className="font-mono text-xs text-[#8b949e] uppercase tracking-widest">
              Ladataan PuistolaCup tuloksia...
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeView 
                teams={teams} 
                matches={matches} 
                sponsors={sponsors} 
                sponsorsIntro={settings?.sponsorsIntro}
                setActiveTab={setActiveTab} 
              />
            )}

            {activeTab === 'matches' && (
              <MatchesView 
                teams={teams} 
                matches={matches} 
              />
            )}

            {activeTab === 'standings' && (
              <StandingsView 
                teams={teams} 
                matches={matches} 
              />
            )}

            {activeTab === 'bracket' && (
              <BracketView 
                teams={teams}
                playoffs={playoffs} 
              />
            )}

            {activeTab === 'rules' && (
              <RulesView 
                settings={settings} 
              />
            )}

            {activeTab === 'sponsors' && (
              <SponsorsView 
                sponsors={sponsors} 
              />
            )}

            {activeTab === 'admin' && (
              <AdminView 
                teams={teams} 
                matches={matches} 
                playoffs={playoffs} 
                sponsors={sponsors} 
                settings={settings} 
              />
            )}
          </>
        )}
      </main>

      {/* Responsive footer */}
      <Footer 
        footerText={settings?.footerText} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
    </div>
  );
}
