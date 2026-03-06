export type FeedbackType = 'bug' | 'feature' | 'content' | 'other';

export type FeedbackRow = {
  id: string;
  created_at: string;
  type: string;
  message: string;
  email: string | null;
  status: 'new' | 'triaged' | 'planned' | 'done' | 'ignored' | string;
  tags: string[];
};

export type CreateFeedbackBody = {
  type: FeedbackType;
  message: string;
  email?: string;
};

