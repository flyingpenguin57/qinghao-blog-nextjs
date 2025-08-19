export type User = {
  id: string;
  username: string;
  password: string;
  email: string | null;
  avator: string | null;
}

export type Article = {
  id: string;
  title: string;
  summary: string;
  content: string;
  author_id: string;
  created_at: Date;
  updated_at: Date;
  tags: string[];
  view_count: number;
  status: number; // 0: draft, 1: published, 2: archived
}

export type Comment = {
  id: string;
  content: string;
  articeleId: string;
  parentId: string | null;
}