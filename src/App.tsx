import { useMemo, useState } from 'react';
import Navigation from './components/Navigation';
import ProjectCard from './components/ProjectCard';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Profile from './pages/Profile';
import ProjectPage from './pages/ProjectPage';
import { generateId } from './utils/generateId';
import { Project, Task, TaskStatus } from './types';
import './App.css';

type Page = 'home' | 'projects' | 'project' | 'profile';

const initialProjects: Project[] = [
  { id: 'p1', name: 'Web App', description: 'Клиентский портал' },
  { id: 'p2', name: 'Mobile App', description: 'Приложение для продаж' },
  { id: 'p3', name: 'Backend', description: 'Сервис API и интеграции' }
];

const initialTasks: Task[] = [
  {
    id: 't1',
    title: 'Дизайн дашборда',
    description: 'Собрать макеты для главной страницы',
    status: 'todo',
    projectId: 'p1',
    assignee: 'Ирина'
  },
  {
    id: 't2',
    title: 'API авторизации',
    description: 'Подключить JWT и refresh токены',
    status: 'progress',
    projectId: 'p3',
    assignee: 'Сергей'
  },
  {
    id: 't3',
    title: 'CI/CD pipeline',
    description: 'Настроить сборку и деплой',
    status: 'progress',
    projectId: 'p3',
    assignee: 'Сергей'
  },
  {
    id: 't4',
    title: 'Онбординг новых юзеров',
    description: 'Сценарии рассылок и подсказок',
    status: 'todo',
    projectId: 'p1',
    assignee: 'Анна'
  },
  {
    id: 't5',
    title: 'Аналитика событий',
    description: 'Собрать метрики в Amplitude',
    status: 'done',
    projectId: 'p1',
    assignee: 'Даниил'
  },
  {
    id: 't6',
    title: 'Прототип чат-поддержки',
    description: 'Подключить WebSocket сервер',
    status: 'todo',
    projectId: 'p2',
    assignee: 'Виктор'
  },
  {
    id: 't7',
    title: 'Оптимизация базы',
    description: 'Индексы и план запросов',
    status: 'done',
    projectId: 'p3',
    assignee: 'Марина'
  },
  {
    id: 't8',
    title: 'UX тестирование',
    description: 'Интервью с 5 пользователями',
    status: 'progress',
    projectId: 'p2',
    assignee: 'Юлия'
  },
  {
    id: 't9',
    title: 'Мобильный онбординг',
    description: 'Экран приветствия и советы',
    status: 'progress',
    projectId: 'p2',
    assignee: 'Анна'
  }
];

const statusLabels: Record<TaskStatus, string> = {
  todo: 'To Do',
  progress: 'In Progress',
  done: 'Done'
};

function App() {
  const [page, setPage] = useState<Page>('home');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  const projectLookup = useMemo(
    () => Object.fromEntries(projects.map((p) => [p.id, p.name])),
    [projects]
  );

  const currentProject = useMemo(
    () => projects.find((p) => p.id === currentProjectId) || null,
    [projects, currentProjectId]
  );

  const handleOpenProject = (projectId: string) => {
    setCurrentProjectId(projectId);
    setPage('project');
  };

  const handleCreateTask = (projectId: string, task: Omit<Task, 'id'>) => {
    setTasks((prev) => [...prev, { ...task, id: generateId(), projectId }]);
  };

  const handleMoveTask = (taskId: string, direction: 'left' | 'right') => {
    const order: TaskStatus[] = ['todo', 'progress', 'done'];
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const idx = order.indexOf(task.status);
        const nextIdx = direction === 'left' ? idx - 1 : idx + 1;
        if (nextIdx < 0 || nextIdx >= order.length) return task;
        return { ...task, status: order[nextIdx] };
      })
    );
  };

  return (
    <div className="app">
      <Navigation current={page} onNavigate={setPage} />
      <main className="content">
        {page === 'home' && <Home projects={projects} tasks={tasks} />}
        {page === 'projects' && (
          <Projects projects={projects} tasks={tasks} onOpen={handleOpenProject} />
        )}
        {page === 'project' && currentProject && (
          <ProjectPage
            project={currentProject}
            tasks={tasks.filter((t) => t.projectId === currentProject.id)}
            statusLabels={statusLabels}
            onBack={() => setPage('projects')}
            onCreate={(task) => handleCreateTask(currentProject.id, task)}
            onMove={handleMoveTask}
          />
        )}
        {page === 'profile' && <Profile />}
      </main>
    </div>
  );
}

export default App;

