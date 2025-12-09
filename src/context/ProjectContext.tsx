import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode
} from 'react';
import { createProject, getProjects } from '../api/projectsApi';
import { Project } from '../types';

interface ProjectContextValue {
  projects: Project[];
  addProject: (payload: { name: string; description?: string }) => Promise<Project>;
}

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to load projects:', error);
      }
    };

    loadProjects();
  }, []);

  const addProject = useCallback(
    async (payload: { name: string; description?: string }) => {
      const project = await createProject(payload);
      setProjects((prev) => [...prev, project]);
      return project;
    },
    []
  );

  const value = useMemo(() => ({ projects, addProject }), [projects, addProject]);

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProjects = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) {
    throw new Error('useProjects must be used within ProjectProvider');
  }
  return ctx;
};

