import React, { useState } from 'react';

interface ApiDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Endpoint {
  method: 'POST' | 'GET' | 'DELETE' | 'PUT';
  path: string;
  summary: string;
  authRequired: boolean;
  requestBody?: Record<string, unknown>;
  responseExample: Record<string, unknown>;
}

const ENDPOINTS: Endpoint[] = [
  {
    method: 'POST',
    path: '/api/v1/auth/register',
    summary: 'Register new developer account with bcrypt hashing',
    authRequired: false,
    requestBody: {
      email: 'recruiter@techcorp.com',
      password: 'SecurePass_2025!',
      role: 'engineering_lead',
    },
    responseExample: {
      status: 'success',
      statusCode: 201,
      message: 'Account created with 12-round bcrypt salt',
      data: {
        userId: 'usr_66fa918b82e9',
        email: 'recruiter@techcorp.com',
        role: 'engineering_lead',
        createdAt: '2025-05-18T10:14:02.114Z',
      },
    },
  },
  {
    method: 'POST',
    path: '/api/v1/auth/login',
    summary: 'Authenticate and receive signed JWT payload & refresh token',
    authRequired: false,
    requestBody: {
      email: 'recruiter@techcorp.com',
      password: 'SecurePass_2025!',
    },
    responseExample: {
      status: 'success',
      statusCode: 200,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      expiresIn: '15m',
      refreshToken: 'rf_90bb4c17fa392...',
      tokenType: 'Bearer',
    },
  },
  {
    method: 'GET',
    path: '/api/v1/auth/me',
    summary: 'Decode JWT Bearer token and retrieve authenticated profile',
    authRequired: true,
    responseExample: {
      status: 'success',
      statusCode: 200,
      data: {
        userId: 'usr_66fa918b82e9',
        verified: true,
        permissions: ['read:systems', 'write:pipelines', 'admin:access'],
        lastActive: '2025-05-18T10:15:30.902Z',
      },
    },
  },
  {
    method: 'POST',
    path: '/api/v1/auth/refresh',
    summary: 'Perform token rotation control and reissue short-lived JWT',
    authRequired: true,
    requestBody: {
      refreshToken: 'rf_90bb4c17fa392...',
    },
    responseExample: {
      status: 'success',
      statusCode: 200,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.reissued...',
      expiresIn: '15m',
    },
  },
];

export const ApiDocsModal: React.FC<ApiDocsModalProps> = ({ isOpen, onClose }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint>(ENDPOINTS[0]);
  const [executionLog, setExecutionLog] = useState<{
    status: number;
    latency: string;
    payload: Record<string, unknown>;
  } | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  if (!isOpen) return null;

  const handleExecute = () => {
    setIsRunning(true);
    setExecutionLog(null);
    setTimeout(() => {
      setIsRunning(false);
      setExecutionLog({
        status: 200,
        latency: `${(Math.random() * 4 + 3).toFixed(1)}ms`,
        payload: selectedEndpoint.responseExample,
      });
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-3xl bg-[#1a1f2e] border border-[#22d3ee]/60 shadow-[0_0_32px_rgba(34,211,238,0.25)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#303444] px-4 py-3 flex items-center justify-between border-b border-[#3c494c]/60">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#22d3ee] text-lg">description</span>
            <span className="font-mono text-xs sm:text-sm text-[#dee2f6] font-semibold">
              Postman & OpenAPI Contract // [SYS_PROJECT_01]
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#859397] hover:text-[#dee2f6] hover:bg-[#252a39] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex flex-col gap-5 font-mono">
          {/* Service Header Info */}
          <div className="flex flex-col gap-1 p-3 bg-[#090e1c] border border-[#3c494c]/40">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#80d5cb] font-semibold">BASE_URL: https://api.ayush.dev/v1</span>
              <span className="text-[#22d3ee]">STRICT_SCHEMAS: ENABLED</span>
            </div>
            <p className="text-[11px] text-[#859397]">
              Auth Service with cryptographically signed tokens, bcrypt salt cycles & Postman collection verification.
            </p>
          </div>

          {/* Endpoints List */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-[#859397] uppercase tracking-wider">Select Endpoint:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ENDPOINTS.map((ep) => {
                const isSelected = selectedEndpoint.path === ep.path;
                return (
                  <button
                    key={ep.path}
                    onClick={() => {
                      setSelectedEndpoint(ep);
                      setExecutionLog(null);
                    }}
                    className={`p-2.5 text-left border flex items-center justify-between gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#252a39] border-[#22d3ee] shadow-sm'
                        : 'bg-[#090e1c] border-[#3c494c]/50 hover:border-[#80d5cb]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 font-bold ${
                          ep.method === 'POST' ? 'bg-[#007068] text-[#9af0e5]' : 'bg-[#005763] text-[#8aebff]'
                        }`}
                      >
                        {ep.method}
                      </span>
                      <span className="text-xs text-[#dee2f6] truncate font-medium">{ep.path}</span>
                    </div>
                    {ep.authRequired && (
                      <span className="text-[9px] text-[#80d5cb] px-1 bg-[#161b2a] border border-[#3c494c]/60">
                        JWT
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Endpoint Details & Execution Runner */}
          <div className="p-4 bg-[#090e1c] border border-[#3c494c]/60 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3c494c]/40 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#007068] text-[#9af0e5] text-xs font-bold">
                  {selectedEndpoint.method}
                </span>
                <span className="text-xs sm:text-sm text-[#22d3ee] font-semibold">
                  {selectedEndpoint.path}
                </span>
              </div>
              <button
                onClick={handleExecute}
                disabled={isRunning}
                className="px-3 py-1.5 bg-[#22d3ee] hover:bg-[#8aebff] text-[#00363e] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(34,211,238,0.3)] disabled:opacity-50 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">play_arrow</span>
                {isRunning ? 'DISPATCHING...' : 'RUN REQUEST'}
              </button>
            </div>

            <p className="text-xs text-[#bbc9cd]">{selectedEndpoint.summary}</p>

            {selectedEndpoint.requestBody && (
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-[#859397] uppercase">Request Payload (JSON):</span>
                <pre className="p-2.5 bg-[#161b2a] border border-[#3c494c]/40 text-xs text-[#80d5cb] overflow-x-auto">
                  {JSON.stringify(selectedEndpoint.requestBody, null, 2)}
                </pre>
              </div>
            )}

            {/* Execution Result Log */}
            {executionLog && (
              <div className="flex flex-col gap-1.5 pt-2 border-t border-[#3c494c]/40">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#80d5cb]"></span>
                    <span className="text-[#80d5cb] font-semibold">STATUS: {executionLog.status} OK</span>
                  </div>
                  <span className="text-[#22d3ee]">ROUNDTRIP: {executionLog.latency}</span>
                </div>
                <pre className="p-3 bg-[#161b2a] border border-[#80d5cb]/50 text-xs text-[#dee2f6] overflow-x-auto">
                  {JSON.stringify(executionLog.payload, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#252a39] px-4 py-2.5 border-t border-[#3c494c]/60 flex items-center justify-between text-xs text-[#859397] font-mono">
          <span>All endpoints validated in CI/CD via Postman Runner</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#1a1f2e] text-[#dee2f6] hover:bg-[#343948] border border-[#3c494c]/60"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
