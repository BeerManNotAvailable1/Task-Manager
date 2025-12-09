export type TaskStatus = 'todo' | 'progress' | 'done';

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
  dueDate?: string;
}

