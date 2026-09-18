import React from 'react';
import { STACK_LAYERS } from '../data/portfolioData';

export const TechnicalStack: React.FC = () => {
  return (
    <section id="stack" className="px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-6 bg-[#090e1c] border-b border-[#3c494c]/20">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#22d3ee]">account_tree</span>
          <h2 className="font-headline text-xl sm:text-2xl text-[#dee2f6] font-semibold tracking-tight">
            Technical Stack
          </h2>
        </div>
        <p className="font-mono text-xs sm:text-sm text-[#bbc9cd]">
          Structured core proficiencies & tooling infrastructure
        </p>
      </div>

      {/* 5 Structured Domain Blocks */}
      <div className="flex flex-col gap-4">
        {STACK_LAYERS.map((layer) => {
          const isPrimary = layer.color === 'primary';
          const isSecondary = layer.color === 'secondary';

          return (
            <div
              key={layer.layer}
              className="p-4 sm:p-5 bg-[#1a1f2e] border border-[#3c494c]/40 hover:border-[#22d3ee]/60 shadow-md flex flex-col gap-3 transition-colors group"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-[#303444] border border-[#3c494c]/60">
                    <span
                      className={`material-symbols-outlined text-base sm:text-lg ${
                        isPrimary
                          ? 'text-[#22d3ee]'
                          : isSecondary
                          ? 'text-[#80d5cb]'
                          : 'text-[#97e9ff]'
                      }`}
                    >
                      {layer.icon}
                    </span>
                  </div>
                  <h3 className="font-mono text-xs sm:text-[13px] text-[#dee2f6] uppercase tracking-wider font-semibold">
                    {layer.title}
                  </h3>
                </div>
                <span
                  className={`font-mono text-[11px] px-2 py-0.5 bg-[#303444] font-semibold tracking-wider ${
                    isPrimary
                      ? 'text-[#8aebff]'
                      : isSecondary
                      ? 'text-[#80d5cb]'
                      : 'text-[#97e9ff]'
                  }`}
                >
                  {layer.layer}
                </span>
              </div>

              {layer.description && (
                <p className="font-mono text-xs sm:text-sm text-[#bbc9cd]">
                  {layer.description}
                </p>
              )}

              <div className="flex flex-wrap gap-1.5 pt-1">
                {layer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-[#252a39] hover:bg-[#343948] text-[#8aebff] font-mono text-xs border border-[#3c494c]/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
