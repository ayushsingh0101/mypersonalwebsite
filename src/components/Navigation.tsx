import React from 'react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'terminal',
    },
    {
      id: 'projects',
      label: 'Systems',
      icon: 'dns',
    },
    {
      id: 'stack',
      label: 'Stack',
      icon: 'account_tree',
    },
    {
      id: 'metrics',
      label: 'Metrics',
      icon: 'query_stats',
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: 'alternate_email',
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#0e1321]/95 backdrop-blur-xl border-t border-[#3c494c]/40 shadow-[0_-1px_16px_rgba(0,0,0,0.6)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center min-w-[52px] min-h-[44px] px-1 transition-all cursor-pointer ${
                isActive
                  ? 'text-[#22d3ee] font-semibold scale-105'
                  : 'text-[#859397] hover:text-[#dee2f6]'
              }`}
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl">{item.icon}</span>
              <span className="font-mono text-[11px] tracking-wider mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
