export interface Project {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  highlights: string[];
  tags: string[];
  githubUrl: string;
  actionType: 'docs' | 'endpoint' | 'demo';
  actionLabel: string;
}

export interface StackLayer {
  layer: string;
  title: string;
  icon: string;
  description: string;
  skills: string[];
  color: 'primary' | 'secondary' | 'tertiary';
}

export interface MetricItem {
  label: string;
  value: string;
  unit?: string;
  change?: string;
  status: 'optimal' | 'warning' | 'nominal';
  detail: string;
}

export interface RecruiterSubmission {
  name: string;
  email: string;
  role: string;
  message: string;
  timestamp: string;
}
