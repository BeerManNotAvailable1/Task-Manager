export type TaskStatus = 'todo' | 'progress' | 'done';

export interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  owner?: string;
  createdAt?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  projectId: string;
  assignee?: string;
  assigneeName?: string;
  dueDate?: string;
  attachments?: string[];
}

