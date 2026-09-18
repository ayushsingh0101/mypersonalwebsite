import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { ApiDocsModal } from './Modals/ApiDocsModal';
import { WeatherTesterModal } from './Modals/WeatherTesterModal';
import { TodoDemoModal } from './Modals/TodoDemoModal';

export const EngineeredSystems: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'docs' | 'endpoint' | 'demo' | null>(null);

  const getHighlightIcon = (projId: string, idx: number) => {
    if (projId === 'auth-api') {
      return idx === 0 ? 'verified_user' : idx === 1 ? 'lock_clock' : 'fact_check';
    }
    if (projId === 'weather-api') {
      return idx === 0 ? 'cloud_sync' : idx === 1 ? 'speed' : 'filter_alt';
    }
    return idx === 0 ? 'sync_alt' : idx === 1 ? 'dynamic_feed' : 'bug_report';
  };

  const getHighlightColor = (projId: string) => {
    if (projId === 'auth-api') return 'text-[#22d3ee]';
    if (projId === 'weather-api') return 'text-[#80d5cb]';
    return 'text-[#97e9ff]';
  };

  const getActionIcon = (type: 'docs' | 'endpoint' | 'demo') => {
    if (type === 'docs') return 'description';
    if (type === 'endpoint') return 'play_arrow';
    return 'visibility';
  };

  return (
    <section id="projects" className="px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#22d3ee]">dns</span>
          <h2 className="font-headline text-xl sm:text-2xl text-[#dee2f6] font-semibold tracking-tight">
            Engineered Systems
          </h2>
        </div>
        <p className="font-mono text-xs sm:text-sm text-[#bbc9cd]">
          Production-style implementations with rigorous verification
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className="bg-[#1a1f2e] border border-[#3c494c]/40 hover:border-[#22d3ee]/60 flex flex-col overflow-hidden shadow-xl transition-all group"
          >
            {/* Image Mockup */}
            <div className="relative w-full h-48 sm:h-56 bg-[#303444] overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={project.title}
                src={project.imageUrl}
              />
              <div className="absolute top-3 right-3 px-2 py-1 bg-[#090e1c]/90 backdrop-blur-md border border-[#3c494c]/50">
                <span
                  className={`font-mono text-[11px] uppercase font-semibold ${
                    project.category === 'API SERVICE'
                      ? 'text-[#22d3ee]'
                      : project.category === 'PIPELINE SERVICE'
                      ? 'text-[#80d5cb]'
                      : 'text-[#97e9ff]'
                  }`}
                >
                  {project.category}
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex flex-col gap-4 font-mono">
              <div>
                <span className="text-xs text-[#80d5cb] font-semibold font-mono">
                  {project.code}
                </span>
                <h3 className="font-headline text-lg sm:text-xl text-[#dee2f6] font-semibold mt-1">
                  {project.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#bbc9cd] leading-relaxed">
                {project.description}
              </p>

              {/* System Highlights Checklist */}
              <div className="flex flex-col gap-2 p-3 bg-[#161b2a] border border-[#3c494c]/30">
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span
                      className={`material-symbols-outlined text-sm mt-0.5 flex-shrink-0 ${getHighlightColor(
                        project.id
                      )}`}
                    >
                      {getHighlightIcon(project.id, idx)}
                    </span>
                    <span className="text-xs text-[#dee2f6] leading-snug">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-[#252a39] text-[#8aebff] text-[11px] border border-[#3c494c]/40 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => setActiveModal(project.actionType)}
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-[#22d3ee] hover:bg-[#8aebff] text-[#00363e] font-mono text-xs sm:text-[13px] uppercase tracking-wider font-bold shadow-[0_0_12px_rgba(34,211,238,0.25)] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">
                    {getActionIcon(project.actionType)}
                  </span>
                  {project.actionLabel}
                </button>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-[#252a39] hover:bg-[#343948] text-[#8aebff] border border-[#3c494c]/60 font-mono text-xs sm:text-[13px] uppercase tracking-wider font-semibold transition-all"
                >
                  <span className="material-symbols-outlined text-base">code</span>
                  {project.id === 'auth-api' ? 'Code Repo' : project.id === 'weather-api' ? 'GitHub' : 'Source'}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modals */}
      <ApiDocsModal
        isOpen={activeModal === 'docs'}
        onClose={() => setActiveModal(null)}
      />
      <WeatherTesterModal
        isOpen={activeModal === 'endpoint'}
        onClose={() => setActiveModal(null)}
      />
      <TodoDemoModal
        isOpen={activeModal === 'demo'}
        onClose={() => setActiveModal(null)}
      />
    </section>
  );
};
