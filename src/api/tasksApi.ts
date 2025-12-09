import { Task } from '../types';
import { request } from './api';

export const getTasks = (projectId?: string) =>
  request<Task[]>(projectId ? `/api/tasks?projectId=${projectId}` : '/api/tasks');

export const getTask = (id: string) => request<Task>(`/api/tasks/${id}`);

export const createTask = (payload: Omit<Task, 'id'>) =>
  request<Task>('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const updateTask = (id: string, data: Partial<Task>) =>
  request<Task>(`/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });

export const deleteTask = (id: string) => request<Task>(`/api/tasks/${id}`, { method: 'DELETE' });

