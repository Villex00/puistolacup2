export interface Team {
  id: string; // Firebase key
  name: string;
  group: string; // Group, e.g. "A" or "B"
}

export interface Match {
  id: string; // Firebase key
  home: string; // Team ID (prefer ID for consistency)
  away: string; // Team ID
  hg: number | null | string; // Home goals
  ag: number | null | string; // Away goals
  time: string; // e.g. "14:30"
  field: number | string; // e.g. 1 or 2
  live: boolean;
  status?: string; // e.g. "live" | "upcoming" | "played"
}

export interface PlayoffMatch {
  id: string; // e.g., "qf_1", "qf_2", "qf_3", "qf_4", "sf_1", "sf_2", "final"
  round: 'qf' | 'sf' | 'final'; // "qf", "sf", "final"
  home: string; // Team ID or free text like "Voittaja Lohko A"
  away: string; // Team ID or free text
  hg: number | null | string; // Home goals
  ag: number | null | string; // Away goals
  live?: boolean; // Live status if needed
  time?: string; // Time of match, e.g. "16:30"
  field?: number | string; // Field e.g. 1 or 2
}

export interface Sponsor {
  id: string; // Firebase key
  name: string;
  logoUrl: string;
  url: string;
  tier: 'main' | 'partner';
}

export interface Settings {
  footerText: string;
  sponsorsIntro: string;
  rules: string;
}
