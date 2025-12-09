import { Project } from '../types';
import { request } from './api';

export const getProjects = () => request<Project[]>('/api/projects');
export const getProject = (id: string) => request<Project>(`/api/projects/${id}`);
export const createProject = (payload: { name: string; description?: string }) =>
  request<Project>('/api/projects', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
export const updateProject = (id: string, data: Partial<Project>) =>
  request<Project>(`/api/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
export const deleteProject = (id: string) =>
  request<Project>(`/api/projects/${id}`, { method: 'DELETE' });

