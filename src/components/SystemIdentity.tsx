import React, { useState } from 'react';

export const SystemIdentity: React.FC = () => {
  const [interactiveCmd, setInteractiveCmd] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = interactiveCmd.trim().toLowerCase();
    if (!cmd) return;

    let response = '';
    if (cmd === 'whoami' || cmd === 'id') {
      response = 'uid=1000(ayush) gid=1000(developer) groups=1000(dev),4(adm),27(sudo)';
    } else if (cmd === 'node -v' || cmd === 'node --version') {
      response = 'v20.12.0 (LTS Iron)';
    } else if (cmd === 'curl /health' || cmd === 'health') {
      response = 'HTTP/1.1 200 OK -> {"status":"UP","latency":"3ms","uptime":"34d"}';
    } else if (cmd === 'help') {
      response = 'Available commands: whoami, node -v, health, stack, clear';
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setInteractiveCmd('');
      return;
    } else if (cmd === 'stack') {
      response = 'MERN Stack (MongoDB, Express, React, Node) + TypeScript & Postman';
    } else {
      response = `bash: command not found: ${cmd}. Type 'help' for options.`;
    }

    setTerminalHistory((prev) => [...prev, `> ${interactiveCmd}`, response]);
    setInteractiveCmd('');
  };

  return (
    <section id="identity" className="px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[#22d3ee]">memory</span>
        <h2 className="font-headline text-xl sm:text-2xl text-[#dee2f6] font-semibold tracking-tight">
          System Identity
        </h2>
      </div>

      {/* Terminal Window Container */}
      <div className="bg-[#1a1f2e] border border-[#3c494c]/40 shadow-xl overflow-hidden">
        {/* Terminal Title Bar */}
        <div className="bg-[#303444] px-4 py-2.5 flex items-center justify-between border-b border-[#3c494c]/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#ffb4ab]"></span>
            <span className="w-2.5 h-2.5 bg-[#80d5cb]"></span>
            <span className="w-2.5 h-2.5 bg-[#22d3ee]"></span>
          </div>
          <span className="font-mono text-xs text-[#bbc9cd] tracking-wide">
            bash - ayush@node-server:~
          </span>
          <span className="material-symbols-outlined text-[#859397] text-base">terminal</span>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-6 flex flex-col gap-5 font-mono">
          {/* Shell Command */}
          <div className="flex items-center gap-2 text-[#80d5cb]">
            <span className="text-[#22d3ee] font-bold">&gt;</span>
            <span className="text-xs sm:text-sm font-semibold">cat profile_manifest.json</span>
          </div>

          {/* Bio Content */}
          <p className="text-sm sm:text-base text-[#dee2f6] leading-relaxed border-l-2 border-[#22d3ee]/40 pl-3">
            I build resilient, high-throughput server backends engineered for performance and
            integrity. Passionate about asynchronous runtime execution, distributed system flows,
            and strict contract-driven REST APIs that eliminate edge latency.
          </p>

          {/* Academic Foundation Box */}
          <div className="p-4 bg-[#090e1c] border border-[#3c494c]/50">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#22d3ee] text-base">school</span>
              <span className="text-xs sm:text-[13px] text-[#8aebff] tracking-wide uppercase font-semibold">
                Academic Foundation
              </span>
            </div>
            <h3 className="font-headline text-base sm:text-lg text-[#dee2f6] font-semibold">
              B.Tech in Computer Science
            </h3>
            <p className="text-xs sm:text-sm text-[#80d5cb] mt-1">
              Maharishi University of Information Technology, Lucknow
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2.5 border-t border-[#3c494c]/40 bg-[#252a39]/40 px-3 py-1.5">
              <span className="text-[11px] text-[#bbc9cd]">Cohort: 2024 – 2028</span>
              <span className="text-[11px] text-[#22d3ee] uppercase font-semibold tracking-wider">
                Status: Active Matriculation
              </span>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="flex flex-col gap-2.5 pt-1">
            <div className="flex items-start gap-2.5 text-[#80d5cb]">
              <span className="material-symbols-outlined text-base mt-0.5 text-[#22d3ee]">
                check_circle
              </span>
              <span className="text-xs sm:text-sm text-[#dee2f6]">
                RESTful routing pipelines & sanitized payload parsing
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-[#80d5cb]">
              <span className="material-symbols-outlined text-base mt-0.5 text-[#22d3ee]">
                check_circle
              </span>
              <span className="text-xs sm:text-sm text-[#dee2f6]">
                Schema index optimization & atomic MongoDB transactions
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-[#80d5cb]">
              <span className="material-symbols-outlined text-base mt-0.5 text-[#22d3ee]">
                check_circle
              </span>
              <span className="text-xs sm:text-sm text-[#dee2f6]">
                Modern engineering acceleration with AI workflow toolsets
              </span>
            </div>
          </div>

          {/* Interactive Shell Terminal Line */}
          {terminalHistory.length > 0 && (
            <div className="flex flex-col gap-1.5 pt-2 border-t border-[#3c494c]/30 text-xs">
              {terminalHistory.map((line, idx) => (
                <div
                  key={idx}
                  className={line.startsWith('>') ? 'text-[#80d5cb] font-semibold' : 'text-[#8aebff] pl-2'}
                >
                  {line}
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1">
            <span className="text-[#22d3ee] font-bold">&gt;</span>
            <input
              type="text"
              value={interactiveCmd}
              onChange={(e) => setInteractiveCmd(e.target.value)}
              placeholder="Try 'whoami', 'health', 'node -v' or 'help'..."
              className="w-full bg-transparent text-xs sm:text-sm text-[#dee2f6] placeholder-[#859397] outline-none focus:ring-0"
            />
            <button
              type="submit"
              className="text-[10px] text-[#859397] hover:text-[#22d3ee] px-2 py-0.5 border border-[#3c494c]/50 uppercase tracking-wider"
            >
              RUN
            </button>
          </form>

          {/* Terminal Output Echo */}
          <div className="text-[#859397] text-[11px] pt-1 border-t border-[#3c494c]/30 flex items-center justify-between">
            <span>[LOADED]: 3 services online | 0 unhandled promise rejections</span>
            <span className="text-[#80d5cb]">SIGNAL: OK</span>
          </div>
        </div>
      </div>
    </section>
  );
};
