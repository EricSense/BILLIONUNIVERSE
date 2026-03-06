export type Signal = {
  id: string;
  title: string;
  systems: string[];
  summary: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  sourceHint?: string;
};
