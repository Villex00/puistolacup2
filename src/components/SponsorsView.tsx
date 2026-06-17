import React from 'react';
import { Sponsor } from '../types';
import { HelpCircle, Star, Award, HeartHandshake, Link as LinkIcon } from 'lucide-react';

interface SponsorsViewProps {
  sponsors: Sponsor[];
}

export default function SponsorsView({ sponsors }: SponsorsViewProps) {
  const mainSponsors = sponsors.filter(s => s.tier === 'main');
  const partnerSponsors = sponsors.filter(s => s.tier === 'partner');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Header */}
      <div className="border-b border-[#30363d] pb-4">
        <span className="font-mono text-2xs font-bold text-[#00c97a] uppercase tracking-widest block">
          Puistola Cup 2026 Tukijat
        </span>
        <h1 className="font-sans font-extrabold text-2xl text-white mt-1 uppercase flex items-center gap-2">
          <HeartHandshake className="w-6 h-6 text-[#00c97a]" />
          Yhteistyökumppanit
        </h1>
        <p className="text-xs text-[#8b949e] mt-1 m-max-xl">
          Nämä upeat yritykset ja organisaatiot mahdollistavat PuistolaCupin järjestämisen Kotkassa laidallamme. Kiitos tuestanne!
        </p>
      </div>

      {/* Main Sponsors */}
      <section className="space-y-4">
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-[#00c97a] fill-[#00c97a]" />
          <h2 className="font-sans font-extrabold text-sm uppercase tracking-wide text-white">
            Pääyhteistyökumppanit (Main Sponsors)
          </h2>
        </div>

        {mainSponsors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mainSponsors.map((sp) => (
              <a
                key={sp.id}
                href={sp.url}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="bg-[#161b22] border border-[#30363d] hover:border-[#00c97a] hover:bg-[#1f2631] p-6 rounded-xl flex flex-col sm:flex-row gap-4 items-center sm:items-start transition-all duration-200 group shadow-md"
              >
                {/* Logo wrapper */}
                <div className="w-24 h-24 shrink-0 bg-neutral-900 border border-[#30363d] rounded-lg flex items-center justify-center p-3 select-none">
                  {sp.logoUrl ? (
                    <img 
                      src={sp.logoUrl} 
                      alt={sp.name} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Award className="w-10 h-10 text-[#00c97a]" />
                  )}
                </div>

                {/* Info Text */}
                <div className="flex-grow space-y-1.5 text-center sm:text-left">
                  <h3 className="font-sans font-black text-base text-white group-hover:text-[#00c97a] transition-colors">
                    {sp.name}
                  </h3>
                  <p className="text-xs text-[#8b949e]">
                    PuistolaCup -pääyhteistyökumppani. Klikkaa vieraillaksesi kotisivuilla ja tutustuaksesi palveluihin.
                  </p>
                  <div className="pt-2 text-[10px] font-mono font-bold text-[#00c97a] flex items-center justify-center sm:justify-start gap-1">
                    <LinkIcon className="w-3 h-3" />
                    <span>Lue lisää yrityksestä</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-[#8b949e] border border-dashed border-[#30363d] text-xs font-mono rounded-xl">
            Ei määritettyjä pääsponsoreita ylläpidossa vielä.
          </div>
        )}
      </section>

      {/* Partner Sponsors */}
      <section className="space-y-4">
        <div className="flex items-center gap-1.5">
          <Award className="w-4 h-4 text-[#8b949e]" />
          <h2 className="font-sans font-extrabold text-sm uppercase tracking-wide text-white">
            Kumppanit & Tukijat (Partners)
          </h2>
        </div>

        {partnerSponsors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {partnerSponsors.map((sp) => (
              <a
                key={sp.id}
                href={sp.url}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="bg-[#161b22] border border-[#30363d] hover:border-[#00c97a] hover:bg-[#1f2631]/50 p-4 rounded-xl flex items-center gap-3 transition-all group shadow-sm"
              >
                {/* Logo inline */}
                <div className="w-10 h-10 shrink-0 bg-[#0d1117] border border-[#30363d] rounded flex items-center justify-center p-1 font-mono text-3xs font-extrabold select-none">
                  {sp.logoUrl ? (
                    <img 
                      src={sp.logoUrl} 
                      alt={sp.name} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    'SP'
                  )}
                </div>

                <div className="flex-grow min-w-0">
                  <h4 className="font-sans font-extrabold text-xs text-[#dae3ee] truncate group-hover:text-[#00c97a] transition-colors leading-tight">
                    {sp.name}
                  </h4>
                  <span className="font-mono text-[9px] text-[#8b949e] block leading-none mt-0.5">
                    Kumppani
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-[#8b949e] border border-dashed border-[#30363d] text-xs font-mono rounded-xl">
            Ei määritettyjä kumppaneita ylläpidossa vielä.
          </div>
        )}
      </section>
    </div>
  );
}
