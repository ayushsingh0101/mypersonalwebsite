import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection }) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0e1321]/90 backdrop-blur-xl border-b border-[#3c494c]/30 shadow-[0_1px_16px_rgba(0,0,0,0.6)]">
      <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo & Identity */}
        <button
          onClick={() => onNavigate('overview')}
          className="flex items-center gap-3 min-w-0 text-left cursor-pointer group focus:outline-none"
        >
          <img
            alt="Ayush Singh Developer Logo"
            className="h-8 w-auto object-contain flex-shrink-0 group-hover:scale-105 transition-transform"
            src={PERSONAL_INFO.logoUrl}
          />
          <div className="flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[13px] tracking-wider text-[#dee2f6] font-semibold">
                Ayush.dev
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] font-mono bg-[#161b2a] text-[#859397] border border-[#3c494c]/50">
                v2.5
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 bg-[#22d3ee] animate-pulse"></span>
              <span className="font-mono text-[11px] text-[#22d3ee] tracking-widest uppercase truncate font-medium">
                Available for hire
              </span>
            </div>
          </div>
        </button>

        {/* Desktop Quick Nav */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-[12px] uppercase tracking-wider">
          <button
            onClick={() => onNavigate('overview')}
            className={`transition-colors hover:text-[#22d3ee] ${
              activeSection === 'overview' ? 'text-[#22d3ee] font-semibold' : 'text-[#859397]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onNavigate('projects')}
            className={`transition-colors hover:text-[#22d3ee] ${
              activeSection === 'projects' ? 'text-[#22d3ee] font-semibold' : 'text-[#859397]'
            }`}
          >
            Systems
          </button>
          <button
            onClick={() => onNavigate('stack')}
            className={`transition-colors hover:text-[#22d3ee] ${
              activeSection === 'stack' ? 'text-[#22d3ee] font-semibold' : 'text-[#859397]'
            }`}
          >
            Stack
          </button>
          <button
            onClick={() => onNavigate('metrics')}
            className={`transition-colors hover:text-[#22d3ee] ${
              activeSection === 'metrics' ? 'text-[#22d3ee] font-semibold' : 'text-[#859397]'
            }`}
          >
            Metrics
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`transition-colors hover:text-[#22d3ee] ${
              activeSection === 'contact' ? 'text-[#22d3ee] font-semibold' : 'text-[#859397]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Profile Avatar & Terminal Badge */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-2 px-2 py-1 bg-[#161b2a] border border-[#3c494c]/40 font-mono text-[11px] text-[#80d5cb]">
            <span className="w-1.5 h-1.5 bg-[#80d5cb]"></span>
            <span>PORT 8080</span>
          </div>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 bg-[#1a1f2e] border border-[#3c494c]/40 hover:border-[#22d3ee] text-[#22d3ee] transition-colors"
            title="GitHub Profile"
          >
            <img
              alt="Ayush Singh"
              className="w-7 h-7 object-cover shadow-[0_0_8px_rgba(34,211,238,0.25)]"
              src={PERSONAL_INFO.avatarUrl}
            />
          </a>
        </div>
      </div>
    </header>
  );
};
