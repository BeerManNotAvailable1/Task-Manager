import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode
} from 'react';
import {
  createTask,
  deleteTask as apiDeleteTask,
  getTasks,
  updateTask as apiUpdateTask
} from '../api/tasksApi';
import { Task, TaskStatus } from '../types';

interface TaskContextValue {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => Promise<Task>;
  updateTask: (id: string, data: Partial<Task>) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (id: string, direction: 'left' | 'right') => Promise<void>;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const loadTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    };

    loadTasks();
  }, []);

  const addTask = useCallback(
    async (task: Omit<Task, 'id'>) => {
      const created = await createTask(task);
      setTasks((prev) => [...prev, created]);
      return created;
    },
    []
  );

  const updateTask = useCallback(async (id: string, data: Partial<Task>) => {
    const updated = await apiUpdateTask(id, data);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    await apiDeleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const moveTask = useCallback(
    async (id: string, direction: 'left' | 'right') => {
      const order: TaskStatus[] = ['todo', 'progress', 'done'];
      const task = tasks.find((t) => t.id === id);
      if (!task) return;
      const idx = order.indexOf(task.status);
      const nextIdx = direction === 'left' ? idx - 1 : idx + 1;
      if (nextIdx < 0 || nextIdx >= order.length) return;
      await updateTask(id, { status: order[nextIdx] });
    },
    [tasks, updateTask]
  );

  const value = useMemo(
    () => ({ tasks, addTask, updateTask, deleteTask, moveTask }),
    [tasks, addTask, updateTask, deleteTask, moveTask]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return ctx;
};

