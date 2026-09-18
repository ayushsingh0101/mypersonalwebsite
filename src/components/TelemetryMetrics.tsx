import React, { useState, useEffect } from 'react';
import { SYSTEM_METRICS } from '../data/portfolioData';

export const TelemetryMetrics: React.FC = () => {
  const [qps, setQps] = useState(142);
  const [pingRunning, setPingRunning] = useState(false);
  const [pingResults, setPingResults] = useState<{
    auth: string;
    weather: string;
    todos: string;
  } | null>(null);

  // Live gentle QPS fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setQps((prev) => Math.max(120, Math.min(168, prev + Math.floor(Math.random() * 7 - 3))));
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const handlePingSweep = () => {
    setPingRunning(true);
    setPingResults(null);
    setTimeout(() => {
      setPingRunning(false);
      setPingResults({
        auth: `${(Math.random() * 2 + 2.8).toFixed(1)}ms // 200 OK`,
        weather: `${(Math.random() * 3 + 3.2).toFixed(1)}ms // 200 OK`,
        todos: `${(Math.random() * 2 + 2.1).toFixed(1)}ms // 200 OK`,
      });
    }, 450);
  };

  return (
    <section id="metrics" className="px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-6 bg-[#090e1c] border-b border-[#3c494c]/20">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#22d3ee]">query_stats</span>
            <h2 className="font-headline text-xl sm:text-2xl text-[#dee2f6] font-semibold tracking-tight">
              Telemetry & Performance
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-[#bbc9cd]">
            Infrastructure telemetry, runtime metrics & active service health
          </p>
        </div>

        <button
          onClick={handlePingSweep}
          disabled={pingRunning}
          className="px-3 py-1.5 bg-[#252a39] hover:bg-[#343948] text-[#22d3ee] border border-[#22d3ee]/40 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-sm">refresh</span>
          {pingRunning ? 'PROBING...' : 'PING SERVICES'}
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {SYSTEM_METRICS.map((metric) => (
          <div
            key={metric.label}
            className="p-4 bg-[#1a1f2e] border border-[#3c494c]/40 hover:border-[#22d3ee]/50 flex flex-col justify-between transition-colors shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[11px] text-[#859397] uppercase tracking-wider font-semibold">
                {metric.label}
              </span>
              <span className="w-1.5 h-1.5 bg-[#22d3ee]"></span>
            </div>

            <div className="flex items-baseline gap-1 my-1">
              <span className="font-headline text-2xl sm:text-3xl text-[#dee2f6] font-bold">
                {metric.label === 'THROUGHPUT' ? qps : metric.value}
              </span>
              {metric.unit && (
                <span className="font-mono text-xs text-[#80d5cb] font-semibold">
                  {metric.unit}
                </span>
              )}
            </div>

            <p className="font-mono text-[11px] text-[#bbc9cd] mt-2 border-t border-[#3c494c]/30 pt-1.5">
              {metric.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Active Service Probe Status */}
      <div className="p-4 bg-[#1a1f2e] border border-[#3c494c]/40 flex flex-col gap-3 font-mono">
        <div className="flex items-center justify-between border-b border-[#3c494c]/40 pb-2 text-xs">
          <div className="flex items-center gap-2 text-[#80d5cb]">
            <span className="w-2 h-2 bg-[#80d5cb] animate-pulse"></span>
            <span className="font-semibold uppercase">Microservices Mesh Health</span>
          </div>
          <span className="text-[#859397]">PROTOCOL: HTTP/2 // TLS 1.3</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="p-2.5 bg-[#090e1c] border border-[#3c494c]/50 flex flex-col gap-1">
            <span className="text-[#859397] text-[10px]">AUTH SERVICE</span>
            <span className="text-[#dee2f6] font-medium">/api/v1/auth</span>
            <span className="text-[#22d3ee] font-semibold text-[11px]">
              {pingResults ? pingResults.auth : '3.1ms // 200 OK'}
            </span>
          </div>
          <div className="p-2.5 bg-[#090e1c] border border-[#3c494c]/50 flex flex-col gap-1">
            <span className="text-[#859397] text-[10px]">WEATHER PROXY</span>
            <span className="text-[#dee2f6] font-medium">/api/v1/weather</span>
            <span className="text-[#80d5cb] font-semibold text-[11px]">
              {pingResults ? pingResults.weather : '4.2ms // 200 OK'}
            </span>
          </div>
          <div className="p-2.5 bg-[#090e1c] border border-[#3c494c]/50 flex flex-col gap-1">
            <span className="text-[#859397] text-[10px]">TODO CONTROLLER</span>
            <span className="text-[#dee2f6] font-medium">/api/v1/todos</span>
            <span className="text-[#97e9ff] font-semibold text-[11px]">
              {pingResults ? pingResults.todos : '2.6ms // 200 OK'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
