import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="overview" className="relative px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-6 overflow-hidden bg-[#090e1c] border-b border-[#3c494c]/20">
      {/* Background ambient lighting */}
      <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#22d3ee]/5 blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 top-1/2 w-64 h-64 rounded-full bg-[#007068]/10 blur-3xl pointer-events-none"></div>

      {/* Monospace Status Pill */}
      <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 bg-[#252a39] border border-[#3c494c]/50 shadow-sm">
        <span className="w-2 h-2 bg-[#22d3ee] animate-pulse"></span>
        <span className="font-mono text-[11px] text-[#8aebff] tracking-widest uppercase font-semibold">
          Open to Opportunities
        </span>
      </div>

      {/* Visual Profile Header Banner */}
      <div className="relative w-full h-36 sm:h-44 overflow-hidden bg-[#1a1f2e] border border-[#3c494c]/30">
        <img
          className="w-full h-full object-cover opacity-40 scale-105 hover:scale-100 transition-transform duration-700"
          alt="Futuristic cybernetic server matrix with luminous neon cyan telemetry lines and deep violet data pipelines in brutalist engineering aesthetic"
          src={PERSONAL_INFO.heroBannerUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090e1c] via-[#090e1c]/60 to-transparent flex items-end p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#303444] border border-[#3c494c]/60 shadow-md">
              <span className="material-symbols-outlined text-[#22d3ee] text-2xl">dns</span>
            </div>
            <div>
              <p className="font-mono text-[12px] text-[#80d5cb] font-semibold tracking-wide">
                NODE_ENV = 'production'
              </p>
              <p className="font-mono text-[13px] text-[#bbc9cd]">
                port: 8080 // latency: <span className="text-[#22d3ee]">4ms</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Headline & Subtitle */}
      <div className="flex flex-col gap-2.5">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#dee2f6] leading-[1.15]">
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-[#80d5cb] to-[#97e9ff]">
            {PERSONAL_INFO.name}
          </span>{' '}
          — {PERSONAL_INFO.role}
        </h1>
        <p className="font-mono text-sm sm:text-base text-[#bbc9cd] max-w-3xl leading-relaxed">
          Specializing in Node.js, REST APIs, database architecture, and scalable web applications.
        </p>
      </div>

      {/* CTA Group */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <button
          onClick={() => onNavigate('projects')}
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#22d3ee] text-[#00363e] font-mono text-[13px] tracking-wider uppercase font-bold shadow-[0_0_18px_rgba(34,211,238,0.35)] transition-all hover:bg-[#8aebff] active:scale-[0.98] cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">terminal</span>
          View Projects
        </button>
        <button
          onClick={() => onNavigate('contact')}
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#252a39] hover:bg-[#343948] text-[#8aebff] font-mono text-[13px] tracking-wider uppercase font-semibold border border-[#3c494c]/60 transition-all active:scale-[0.98] cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">mail</span>
          Contact Me
        </button>
      </div>

      {/* Quick Channels */}
      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        <span className="font-mono text-[11px] text-[#859397] uppercase tracking-wider">Signals:</span>
        <a
          aria-label="LinkedIn"
          className="p-2.5 bg-[#252a39] text-[#8aebff] hover:text-[#22d3ee] hover:bg-[#343948] border border-[#3c494c]/40 transition-all"
          href={PERSONAL_INFO.linkedin}
          rel="noreferrer"
          target="_blank"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z"></path>
          </svg>
        </a>
        <a
          aria-label="GitHub"
          className="p-2.5 bg-[#252a39] text-[#8aebff] hover:text-[#22d3ee] hover:bg-[#343948] border border-[#3c494c]/40 transition-all"
          href={PERSONAL_INFO.github}
          rel="noreferrer"
          target="_blank"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"></path>
          </svg>
        </a>
        <button
          onClick={handleCopyEmail}
          aria-label="Direct Email"
          className="p-2.5 bg-[#252a39] text-[#8aebff] hover:text-[#22d3ee] hover:bg-[#343948] border border-[#3c494c]/40 transition-all cursor-pointer"
          title="Click to copy email address"
        >
          <span className="material-symbols-outlined text-lg">alternate_email</span>
        </button>

        <span
          onClick={handleCopyEmail}
          className="font-mono text-xs sm:text-sm text-[#bbc9cd] hover:text-[#22d3ee] cursor-pointer truncate transition-colors"
          title="Click to copy"
        >
          {copied ? (
            <span className="text-[#80d5cb] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">check</span>
              COPIED TO CLIPBOARD
            </span>
          ) : (
            PERSONAL_INFO.email
          )}
        </span>
      </div>
    </section>
  );
};
