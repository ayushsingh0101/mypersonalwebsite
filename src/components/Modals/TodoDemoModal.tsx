import React, { useState } from 'react';

interface TodoDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  priority: 'HIGH' | 'MED' | 'LOW';
  createdAt: string;
}

interface NetworkLog {
  id: string;
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE';
  endpoint: string;
  status: number;
  latency: string;
  timestamp: string;
}

export const TodoDemoModal: React.FC<TodoDemoModalProps> = ({ isOpen, onClose }) => {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: 'td_901',
      title: 'Configure MongoDB compound index on user_id + status',
      completed: true,
      priority: 'HIGH',
      createdAt: '10:20:15',
    },
    {
      id: 'td_902',
      title: 'Implement global asynchronous error interceptor middleware',
      completed: true,
      priority: 'HIGH',
      createdAt: '10:22:30',
    },
    {
      id: 'td_903',
      title: 'Run Postman collection regression tests against staging',
      completed: false,
      priority: 'MED',
      createdAt: '10:30:00',
    },
  ]);

  const [inputTitle, setInputTitle] = useState('');
  const [priority, setPriority] = useState<'HIGH' | 'MED' | 'LOW'>('HIGH');
  const [networkLogs, setNetworkLogs] = useState<NetworkLog[]>([
    {
      id: 'net_1',
      method: 'GET',
      endpoint: '/api/v1/todos?limit=10',
      status: 200,
      latency: '6.4ms',
      timestamp: '10:31:02',
    },
  ]);

  if (!isOpen) return null;

  const addNetworkLog = (method: 'POST' | 'GET' | 'PATCH' | 'DELETE', endpoint: string, status: number, latencyMs: number) => {
    const newLog: NetworkLog = {
      id: `net_${Date.now()}`,
      method,
      endpoint,
      status,
      latency: `${latencyMs.toFixed(1)}ms`,
      timestamp: new Date().toLocaleTimeString(),
    };
    setNetworkLogs((prev) => [newLog, ...prev.slice(0, 5)]);
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim()) return;

    const newTodo: TodoItem = {
      id: `td_${Math.floor(Math.random() * 9000 + 1000)}`,
      title: inputTitle.trim(),
      completed: false,
      priority,
      createdAt: new Date().toLocaleTimeString(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    setInputTitle('');
    addNetworkLog('POST', '/api/v1/todos', 201, Math.random() * 8 + 6);
  };

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    addNetworkLog('PATCH', `/api/v1/todos/${id}`, 200, Math.random() * 5 + 4);
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    addNetworkLog('DELETE', `/api/v1/todos/${id}`, 200, Math.random() * 4 + 3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#1a1f2e] border border-[#97e9ff]/60 shadow-[0_0_32px_rgba(151,233,255,0.25)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#303444] px-4 py-3 flex items-center justify-between border-b border-[#3c494c]/60">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#97e9ff] text-lg">sync_alt</span>
            <span className="font-mono text-xs sm:text-sm text-[#dee2f6] font-semibold">
              Interactive Full-Stack Sandbox // [SYS_PROJECT_03]
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
          <div className="p-3 bg-[#090e1c] border border-[#3c494c]/50 text-xs">
            <div className="flex items-center justify-between text-[#97e9ff] font-semibold mb-1">
              <span>STACK: React UI &harr; Express Controller &harr; MongoDB</span>
              <span className="text-[#80d5cb]">OPTIMISTIC STATE: ACTIVE</span>
            </div>
            <p className="text-[11px] text-[#859397]">
              Every client action triggers immediate UI dispatch while synchronously verifying payload with backplane database collections.
            </p>
          </div>

          {/* Add Todo Form */}
          <form onSubmit={handleAddTodo} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              placeholder="Add backend task or microservice..."
              className="flex-1 px-3 py-2 bg-[#090e1c] border border-[#3c494c] text-xs sm:text-sm text-[#dee2f6] outline-none focus:border-[#97e9ff]"
            />
            <div className="flex gap-2">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'HIGH' | 'MED' | 'LOW')}
                className="px-2 py-2 bg-[#090e1c] border border-[#3c494c] text-xs text-[#80d5cb] outline-none"
              >
                <option value="HIGH">HIGH</option>
                <option value="MED">MED</option>
                <option value="LOW">LOW</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-[#44d1f0] hover:bg-[#97e9ff] text-[#003640] font-bold text-xs uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Create
              </button>
            </div>
          </form>

          {/* Task List */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-[#859397] uppercase tracking-wider">
              Persisted Tasks ({todos.length}):
            </span>
            <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`p-2.5 border flex items-center justify-between gap-2 transition-all ${
                    todo.completed
                      ? 'bg-[#090e1c]/70 border-[#3c494c]/40 opacity-75'
                      : 'bg-[#090e1c] border-[#3c494c]/70 hover:border-[#97e9ff]'
                  }`}
                >
                  <div
                    onClick={() => handleToggle(todo.id)}
                    className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                  >
                    <div
                      className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                        todo.completed
                          ? 'bg-[#22d3ee] border-[#22d3ee] text-[#00363e]'
                          : 'border-[#859397]'
                      }`}
                    >
                      {todo.completed && (
                        <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                      )}
                    </div>
                    <span
                      className={`text-xs sm:text-sm truncate ${
                        todo.completed ? 'line-through text-[#859397]' : 'text-[#dee2f6]'
                      }`}
                    >
                      {todo.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-[9px] px-1.5 py-0.5 font-bold ${
                        todo.priority === 'HIGH'
                          ? 'bg-[#93000a] text-[#ffdad6]'
                          : todo.priority === 'MED'
                          ? 'bg-[#005763] text-[#8aebff]'
                          : 'bg-[#252a39] text-[#859397]'
                      }`}
                    >
                      {todo.priority}
                    </span>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="p-1 text-[#859397] hover:text-[#ffb4ab] transition-colors"
                      title="Delete task"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Network Trace Log */}
          <div className="p-3 bg-[#090e1c] border border-[#3c494c]/60 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] text-[#859397] border-b border-[#3c494c]/40 pb-1">
              <span className="text-[#80d5cb] font-semibold">LIVE EXPRESS REST LOG TRACE</span>
              <span>SYNCHRONOUS RESPONSES</span>
            </div>
            <div className="flex flex-col gap-1 text-[11px]">
              {networkLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between gap-2 font-mono">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-1 py-0.2 font-bold text-[9px] ${
                        log.method === 'POST'
                          ? 'text-[#80d5cb]'
                          : log.method === 'PATCH'
                          ? 'text-[#22d3ee]'
                          : log.method === 'DELETE'
                          ? 'text-[#ffb4ab]'
                          : 'text-[#8aebff]'
                      }`}
                    >
                      {log.method}
                    </span>
                    <span className="text-[#bbc9cd]">{log.endpoint}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#80d5cb]">HTTP {log.status}</span>
                    <span className="text-[#859397]">{log.latency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#252a39] px-4 py-2.5 border-t border-[#3c494c]/60 flex items-center justify-between text-xs text-[#859397] font-mono">
          <span>MongoDB collection: `tasks_col_v1`</span>
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
