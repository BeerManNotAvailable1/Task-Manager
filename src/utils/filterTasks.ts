import { Task, TaskStatus } from '../types';

export const filterTasks = (tasks: Task[], status: TaskStatus): Task[] =>
  tasks.filter((task) => task.status === status);

