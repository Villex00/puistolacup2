import React from 'react';
import { Settings } from '../types';
import { BookOpen, Award, Goal, MapPin, ClipboardList } from 'lucide-react';

interface RulesViewProps {
  settings?: Settings;
}

export default function RulesView({ settings }: RulesViewProps) {
  // Extract custom rules or fallback to default structured layouts
  const hasCustomRules = settings && settings.rules && settings.rules.trim() !== '';

  // default guidelines to render beautifully
  const rulesMarkup = settings?.rules || ``;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="border-b border-[#30363d] pb-4">
        <span className="font-mono text-2xs font-bold text-[#00c97a] uppercase tracking-widest block">
          Puistolan urheilukenttä • 4.7.2026
        </span>
        <h1 className="font-sans font-extrabold text-2xl text-white mt-1 uppercase flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[#00c97a]" />
          Turnaussäännöt & Ohjeet
        </h1>
      </div>

      {hasCustomRules ? (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 md:p-8 space-y-6">
          <div className="prose prose-invert max-w-none text-[#dae3ee] text-sm md:text-base whitespace-pre-line font-sans leading-relaxed">
            {settings.rules}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Yleissäännöt */}
          <div className="bg-[#161b22] border border-[#30363d] p-5 rounded-xl space-y-3">
            <h3 className="font-sans font-extrabold text-sm text-[#00c97a] uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-[#30363d]">
              <ClipboardList className="w-4 h-4 text-[#00c97a]" />
              Yleissäännöt
            </h3>
            <ul className="space-y-2 text-xs md:text-sm text-[#8b949e] list-disc list-inside">
              <li>Pelimuotona on <strong className="text-[#dae3ee]">7v7</strong> (6 kenttäpelaajaa + maalivahti).</li>
              <li>Otteluaika on tasan <strong className="text-[#dae3ee]">20 minuuttia</strong> per ottelu, ei puoliaikaa.</li>
              <li>Pelataan rennossa ja rehdissä höntsähengessä!</li>
              <li>Sallitut rajattomat edestakaiset lentovaihdot pelikatkoilla.</li>
              <li>Paitsiosääntö ei ole käytössä lohkossa.</li>
            </ul>
          </div>

          {/* Pisteytysjärjestelmä */}
          <div className="bg-[#161b22] border border-[#30363d] p-5 rounded-xl space-y-3">
            <h3 className="font-sans font-extrabold text-sm text-[#00c97a] uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-[#30363d]">
              <Award className="w-4 h-4 text-[#00c97a]" />
              Pisteytysjärjestelmä
            </h3>
            <ul className="space-y-2 text-xs md:text-sm text-[#8b949e] list-inside list-disc">
              <li>Voitosta saa <strong className="text-[#dae3ee]">3 pistettä</strong>.</li>
              <li>Tasapelistä saa <strong className="text-[#dae3ee]">1 pisteen</strong>.</li>
              <li>Häviöstä saa <strong className="text-[#dae3ee]">0 pistettä</strong>.</li>
              <li>Sijoitus lohkossa ratkeaa järjestyksessä: Pisteet → Maaliero → Tehdyt maalit → Keskinäinen peli.</li>
            </ul>
          </div>

          {/* Pudotuspelisäännöt */}
          <div className="bg-[#161b22] border border-[#30363d] p-5 rounded-xl space-y-3">
            <h3 className="font-sans font-extrabold text-sm text-[#00c97a] uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-[#30363d]">
              <Goal className="w-4 h-4 text-[#00c97a]" />
              Pudotuspelit (Playoffs)
            </h3>
            <p className="text-xs md:text-sm text-[#8b949e]">
              Pudotuspelit (Puolivälierät, välierät, finaali) pelataan kerrasta poikki periaatteella.
            </p>
            <p className="text-xs md:text-sm text-[#8b949e] border-l-2 border-[#00c97a] pl-2 py-0.5">
              Jos ottelu on tasan 20 minuutin jälkeen, suoritetaan suoraan <strong className="text-[#dae3ee]">rangaistuspotkukilpailu</strong>: 3 laukojaa per joukkue, sen jälkeen kerrasta poikki.
            </p>
          </div>

          {/* Käytännön ohjeet */}
          <div className="bg-[#161b22] border border-[#30363d] p-5 rounded-xl space-y-3">
            <h3 className="font-sans font-extrabold text-sm text-[#00c97a] uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-[#30363d]">
              <MapPin className="w-4 h-4 text-[#00c97a]" />
              Käytännön ohjeet
            </h3>
            <ul className="space-y-2 text-xs md:text-sm text-[#8b949e] list-disc list-inside">
              <li>Molemmat kentät ovat Puistolan urheilukentällä Kotkassa.</li>
              <li>Pukeutukaa säänmukaisiin peliasuihin/liiveihin.</li>
              <li>Ensiaputarvikkeet löytyvät keskuskojusta.</li>
              <li>Noudatetaan hyvää urheiluhenkeä ja reilua peliä!</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
