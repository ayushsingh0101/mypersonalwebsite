import React, { useState } from 'react';

interface WeatherTesterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WeatherResponse {
  query: string;
  cacheStatus: 'HIT' | 'MISS';
  latency: string;
  timestamp: string;
  data: {
    location: string;
    coordinates: { lat: number; lon: number };
    temperatureC: number;
    condition: string;
    humidity: number;
    windSpeedKph: number;
    sanitizedQuery: string;
    upstreamProvider: string;
  };
}

const CITY_PRESETS: Record<string, { lat: number; lon: number; temp: number; condition: string; humidity: number; wind: number }> = {
  lucknow: { lat: 26.8467, lon: 80.9462, temp: 29.4, condition: 'Clear Atmosphere', humidity: 48, wind: 12.5 },
  london: { lat: 51.5074, lon: -0.1278, temp: 16.2, condition: 'Overcast Cloud', humidity: 72, wind: 18.0 },
  tokyo: { lat: 35.6762, lon: 139.6503, temp: 22.0, condition: 'Scattered Cirrus', humidity: 55, wind: 8.4 },
  'san francisco': { lat: 37.7749, lon: -122.4194, temp: 18.5, condition: 'Coastal Fog', humidity: 78, wind: 22.1 },
  berlin: { lat: 52.52, lon: 13.405, temp: 19.1, condition: 'Partly Cloudy', humidity: 50, wind: 14.3 },
};

export const WeatherTesterModal: React.FC<WeatherTesterModalProps> = ({ isOpen, onClose }) => {
  const [cityInput, setCityInput] = useState('Lucknow');
  const [cacheMemory, setCacheMemory] = useState<Set<string>>(new Set(['lucknow']));
  const [result, setResult] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleFetchWeather = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanCity = cityInput.trim().toLowerCase();
    if (!cleanCity) return;

    setLoading(true);
    setResult(null);

    const isHit = cacheMemory.has(cleanCity);
    const delay = isHit ? 80 : 380; // realistic mock latency

    setTimeout(() => {
      setLoading(false);
      const preset = CITY_PRESETS[cleanCity] || {
        lat: 28.6139,
        lon: 77.209,
        temp: 24.8,
        condition: 'Clear Sky',
        humidity: 60,
        wind: 10.2,
      };

      // Add to simulated cache
      setCacheMemory((prev) => new Set(prev).add(cleanCity));

      setResult({
        query: cityInput,
        cacheStatus: isHit ? 'HIT' : 'MISS',
        latency: isHit ? '2.4ms (CACHE_HIT)' : '46.8ms (UPSTREAM_FETCH)',
        timestamp: new Date().toISOString(),
        data: {
          location: cityInput.toUpperCase(),
          coordinates: { lat: preset.lat, lon: preset.lon },
          temperatureC: preset.temp,
          condition: preset.condition,
          humidity: preset.humidity,
          windSpeedKph: preset.wind,
          sanitizedQuery: cleanCity.replace(/[^a-z0-9 ]/gi, ''),
          upstreamProvider: 'OpenWeatherMap-v2.5 via Node Proxy Interceptor',
        },
      });
    }, delay);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#1a1f2e] border border-[#80d5cb]/60 shadow-[0_0_32px_rgba(128,213,203,0.25)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#303444] px-4 py-3 flex items-center justify-between border-b border-[#3c494c]/60">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#80d5cb] text-lg">cloud_sync</span>
            <span className="font-mono text-xs sm:text-sm text-[#dee2f6] font-semibold">
              Live Endpoint Test Bench // [SYS_PROJECT_02]
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#859397] hover:text-[#dee2f6] hover:bg-[#252a39] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex flex-col gap-5 font-mono">
          <div className="p-3 bg-[#090e1c] border border-[#3c494c]/50 text-xs">
            <div className="flex items-center justify-between text-[#80d5cb] font-semibold mb-1">
              <span>ROUTE: GET /api/v1/weather/telemetry</span>
              <span className="text-[#22d3ee]">CACHE_POLICY: LRU_MAP_TTL_10M</span>
            </div>
            <p className="text-[11px] text-[#859397]">
              Demonstrates upstream timeout control, in-memory deduplication, and JSON response normalization.
            </p>
          </div>

          {/* City Query Input Form */}
          <form onSubmit={handleFetchWeather} className="flex flex-col gap-3">
            <label className="text-xs text-[#859397] uppercase tracking-wider flex items-center gap-1">
              <span className="text-[#80d5cb]">&gt;</span> Target Geographical Node / City
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="e.g. Lucknow, London, Tokyo, San Francisco..."
                className="flex-1 px-3 py-2 bg-[#090e1c] border border-[#3c494c] text-xs sm:text-sm text-[#dee2f6] outline-none focus:border-[#80d5cb]"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-[#80d5cb] hover:bg-[#9cf2e8] text-[#003733] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-base">send</span>
                {loading ? 'Pinging...' : 'Execute'}
              </button>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#859397]">
              <span>Quick Presets:</span>
              {Object.keys(CITY_PRESETS).map((city) => (
                <button
                  type="button"
                  key={city}
                  onClick={() => {
                    setCityInput(city);
                    setTimeout(() => handleFetchWeather(), 50);
                  }}
                  className="px-2 py-0.5 bg-[#252a39] hover:bg-[#343948] text-[#80d5cb] border border-[#3c494c]/40 capitalize cursor-pointer"
                >
                  {city}
                </button>
              ))}
            </div>
          </form>

          {/* Response Box */}
          {result && (
            <div className="p-4 bg-[#090e1c] border border-[#80d5cb]/50 flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-[#3c494c]/40 pb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-bold ${
                      result.cacheStatus === 'HIT'
                        ? 'bg-[#007068] text-[#9af0e5]'
                        : 'bg-[#93000a] text-[#ffdad6]'
                    }`}
                  >
                    {result.cacheStatus === 'HIT' ? 'CACHE HIT' : 'UPSTREAM MISS'}
                  </span>
                  <span className="text-[#dee2f6] font-semibold">{result.data.location}</span>
                </div>
                <span className="text-[#80d5cb] font-semibold">{result.latency}</span>
              </div>

              {/* Parsed Metric Badges */}
              <div className="grid grid-cols-3 gap-2 py-2">
                <div className="p-2 bg-[#161b2a] border border-[#3c494c]/30">
                  <span className="text-[10px] text-[#859397]">TEMP</span>
                  <div className="text-sm text-[#22d3ee] font-bold">{result.data.temperatureC}°C</div>
                </div>
                <div className="p-2 bg-[#161b2a] border border-[#3c494c]/30">
                  <span className="text-[10px] text-[#859397]">HUMIDITY</span>
                  <div className="text-sm text-[#80d5cb] font-bold">{result.data.humidity}%</div>
                </div>
                <div className="p-2 bg-[#161b2a] border border-[#3c494c]/30">
                  <span className="text-[10px] text-[#859397]">CONDITION</span>
                  <div className="text-xs text-[#dee2f6] truncate font-medium">{result.data.condition}</div>
                </div>
              </div>

              {/* Raw JSON Schema Stream */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-[#859397] uppercase">Sanitized Output Payload:</span>
                <pre className="p-2.5 bg-[#161b2a] border border-[#3c494c]/40 text-xs text-[#80d5cb] overflow-x-auto max-h-48">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#252a39] px-4 py-2.5 border-t border-[#3c494c]/60 flex items-center justify-between text-xs text-[#859397] font-mono">
          <span>In-memory cache size: {cacheMemory.size} records</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#1a1f2e] text-[#dee2f6] hover:bg-[#343948] border border-[#3c494c]/60 cursor-pointer"
          >
            Close Sandbox
          </button>
        </div>
      </div>
    </div>
  );
};
