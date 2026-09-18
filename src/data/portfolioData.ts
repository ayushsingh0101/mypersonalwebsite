import { Project, StackLayer, MetricItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Ayush Singh',
  role: 'MERN Stack Backend Developer',
  email: 'myayushsingh31@gmail.com',
  phone: '+91 8081156636',
  location: 'Lucknow, India',
  status: 'Available for hire',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  logoUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1WzoKg8r7l0sigOGMa8FajKdLgHhDe1wxyPuMnIjrQWEh1QgyRzXmCnCxcbMxjqOLzVwrm4fiHk3gNIKS6XXE1rIkEccUFwibbe6xEIsOB-mrW6jCy6yd1uy5SoIFttQNOeFU_6qduZIbd5z37ju4jAZna1mb3XPZw6PM5Yi_3imQmi8jibvHmNwogjNMJDbGw2sYcIwOXJI66ZO2n9i9ajlDJlZ_ui10ahqXFEfusXioRSIGh2Bffpadpu',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5LPZJRi-rk9aOY2Vu6g4yUbvcZiJQ0e1ZPviFszp82xp1PvUFo1iBbrKR-wj27dBWPQEXHy2kbPXjadHXqyoo5617fLFxiDQTgaUgfWeeRZ35KJllaSe8mma1Vo7hztnKNbNNuOOzTItZGs3bRmpUN4DND6TkcQBqmGBsEwWT3UQLh9OD19-hCJrFYHayeoSnz2Lby4624yqylT5CnclwXPv76_8sGAkjPoHpwByl0q-grWqAX80sdg',
  heroBannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt5k3_LfobWrjYoCcZRW1BRnO_i5TzAwKYzmy8TP0rVwVZBJz1WdZ6u5tr5OuyaY9aIF3bGMeJvCyQ61pzO69_NpmcQifP7QKKWmwliQAlunQkHr6vZ2UU-9L95TqhFtcdCu9LxnARuAXlfV0XQV5xzGQEV3Qh9jS0QJL1a1nh_IIucfMcgI-4HPIUbWFVVu4vVxBjxcjz9nOfP7yu4u5T9FAoGvVJRGtY61SRwxok0eK3fU_G2zHQBw',
};

export const PROJECTS: Project[] = [
  {
    id: 'auth-api',
    code: '[SYS_PROJECT_01]',
    title: 'Authentication Backend API',
    category: 'API SERVICE',
    description:
      'Token-based security kernel handling cryptographically signed authentication workflows, encrypted password vaults, role granularity, and comprehensive contract-checked collections.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC5QQNB3_fFEjXQ8za6QNuwaCAlEOsqwR-ANwrvI5j4hEqyFZqxcMMdnV9_nKZyngWfWssFfDccHJ-DvHS7bd3kCDNp56-v7dZE5r4qBl137EOSOYFdr_Ak41P83kXVw01xJD95KhGvGM6LTjPAvqQ5NJgvafadsc5RP7Q_LIz2PthApYXJKj74qBQo-uiCAIh1ljvrM8Y1bDNk3lvL0iJG5hiVL7mMhV8Gp91Rx0d-C0O8lB4a-T-P2A',
    highlights: [
      'JWT token generation with refresh rotation & auto-expiry',
      'bcrypt salted hash cycles on secure registration endpoints',
      'Strict Postman test suite validating status 200, 401, and 403 paths',
    ],
    tags: ['Node.js', 'Express.js', 'JWT', 'MongoDB'],
    githubUrl: 'https://github.com',
    actionType: 'docs',
    actionLabel: 'API Docs',
  },
  {
    id: 'weather-api',
    code: '[SYS_PROJECT_02]',
    title: 'Weather App Backend',
    category: 'PIPELINE SERVICE',
    description:
      'Data aggregation proxy service consuming high-volume meteorological feeds, scrubbing user query input strings, caching frequent queries, and emitting optimized JSON schema objects.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCItPz2JVWehNRLBX121NBEGjrNb1ZLEPHmeZC3BSFzoeaNcqh5I3p-mg5AB85YUsecPXm1RAYuC1bWfFxxTPTS6tawsT9bJR_6adUAYBDoc7MYaywHT2UiARVCseDCoQJEnxakZcmHM0bX0yQZlbDvvi5B9hrYYINJ5i0v97y6y1notQfao5wBO04itnhPzyBJlT11DHyYj22fPdLL6_2AEzhXUfiji40bhYPoucEgQ55xUVIJwRj4zQ',
    highlights: [
      'Third-party REST orchestration with upstream timeout controls',
      'In-memory caching layer preventing duplicate external API billing',
      'Query parameter sanitation preventing injection and crash cascades',
    ],
    tags: ['Node.js', 'Express.js', 'REST API', 'Postman'],
    githubUrl: 'https://github.com',
    actionType: 'endpoint',
    actionLabel: 'Live Endpoint',
  },
  {
    id: 'todo-system',
    code: '[SYS_PROJECT_03]',
    title: 'Full-Stack Todo System',
    category: 'FULL STACK',
    description:
      'Cohesive end-to-end task workflow demonstrating seamless React client bindings with an Express backplane, durable MongoDB collections, and clean error-capturing middleware.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDg2PHnQzzHkcPz2XyGYn-rajo2epbn5V8tCwxK5EneTM4vDLrTBuA-V_jerheYHymc0QLGWVQHGRn6S8aqAluvbUBqrYq5nyTuNm3EdnZd6mlNvRoOnDkvzGyIP4lhEfxzhnrWZaH5fcNDfNIQJS5zoqsWiTf0eLEbHrVKa7ws_Rg0cPWXYkhLN8x5RtoxFbbpB9h0Y5FzNMwGY_1NGXpomTdHRTiwgk_A7tOCIpRTqxE1CpJgwOQ8Vg',
    highlights: [
      'Atomic CRUD controller actions mapped to deterministic routes',
      'Optimistic client state dispatch paired with DB reconciliation',
      'Global unhandled exception interceptor with structured error logging',
    ],
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    githubUrl: 'https://github.com',
    actionType: 'demo',
    actionLabel: 'Demo',
  },
];

export const STACK_LAYERS: StackLayer[] = [
  {
    layer: 'LAYER 01',
    title: 'Backend & Core Runtime',
    icon: 'terminal',
    description: 'Asynchronous Node engine, microservices routing, secure auth handshakes.',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'bcrypt Encrypt'],
    color: 'primary',
  },
  {
    layer: 'LAYER 02',
    title: 'Databases & Storage',
    icon: 'database',
    description: 'Document stores, ODM mapping, compound queries, and write benchmarks.',
    skills: ['MongoDB', 'Mongoose', 'Schema Optimization', 'Query Indexing'],
    color: 'secondary',
  },
  {
    layer: 'LAYER 03',
    title: 'Frontend Layer',
    icon: 'devices',
    description: 'Client hydration, state propagation, responsive token systems.',
    skills: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS'],
    color: 'tertiary',
  },
  {
    layer: 'LAYER 04',
    title: 'Core Languages',
    icon: 'code',
    description: 'Algorithmic computing, procedural architectures, and typed object manipulation.',
    skills: ['JavaScript', 'Python', 'C', 'C++'],
    color: 'primary',
  },
  {
    layer: 'LAYER 05',
    title: 'Tooling & Environment',
    icon: 'construction',
    description: 'Version control automation, API contract inspection, and system shell execution.',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Linux Terminal'],
    color: 'secondary',
  },
];

export const SYSTEM_METRICS: MetricItem[] = [
  {
    label: 'NODE_ENV',
    value: 'production',
    status: 'optimal',
    detail: 'v20.12.0 LTS Active',
  },
  {
    label: 'P50 LATENCY',
    value: '4',
    unit: 'ms',
    change: '-1.2ms',
    status: 'optimal',
    detail: 'Fastify & Express baseline benchmark',
  },
  {
    label: 'THROUGHPUT',
    value: '142',
    unit: 'req/s',
    change: '+14%',
    status: 'optimal',
    detail: 'Async non-blocking I/O loop',
  },
  {
    label: 'DB WRITES',
    value: '18',
    unit: 'ms',
    status: 'optimal',
    detail: 'Indexed MongoDB replica node',
  },
  {
    label: 'MEM USAGE',
    value: '68',
    unit: 'MB',
    status: 'nominal',
    detail: 'RSS footprint managed with strict GC',
  },
  {
    label: 'AVAILABILITY',
    value: '99.98%',
    status: 'optimal',
    detail: 'Zero unhandled promise crashes',
  },
];
