import React from 'react';

export const TelemetryTicker: React.FC = () => {
  return (
    <div className="w-full bg-[#252a39] border-y border-[#3c494c]/50 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 shadow-inner">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[#80d5cb] text-sm sm:text-base">data_object</span>
        <span className="font-mono text-[11px] uppercase text-[#bbc9cd] tracking-wider font-semibold">
          Architecture Stance
        </span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
        <span className="font-mono text-[#22d3ee] font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#22d3ee] animate-pulse"></span>
          Stateless REST
        </span>
        <span className="font-mono text-[#859397]">|</span>
        <span className="font-mono text-[#80d5cb]">JSON Schema</span>
        <span className="hidden sm:inline-block font-mono text-[#859397]">|</span>
        <span className="hidden sm:inline-block font-mono text-[#97e9ff]">Atomic DB Txns</span>
      </div>
    </div>
  );
};
