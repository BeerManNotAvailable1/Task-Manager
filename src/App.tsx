import { useMemo, useState } from 'react';
import Navigation from './components/Navigation';
import TaskCard from './components/TaskCard';
import ProjectCard from './components/ProjectCard';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Profile from './pages/Profile';
import { filterTasks } from './utils/filterTasks';
import { formatDate } from './utils/dateHelpers';
import { Project, Task, TaskStatus } from './types';
import './App.css';

type Page = 'home' | 'projects' | 'profile';

const projects: Project[] = [
  {
    id: 'p1',
    name: 'Web App',
    description: 'Клиентский портал для управления задачами',
    owner: 'Ирина',
    createdAt: '2024-10-02'
  },
  {
    id: 'p2',
    name: 'Mobile App',
    description: 'Приложение для команды продаж',
    owner: 'Даниил',
    createdAt: '2024-11-12'
  },
  {
    id: 'p3',
    name: 'Backend',
    description: 'Сервис API и интеграции',
    owner: 'Сергей',
    createdAt: '2024-08-21'
  }
];

const tasks: Task[] = [
  {
    id: 't1',
    title: 'Дизайн дашборда',
    description: 'Собрать макеты для главной страницы',
    status: 'todo',
    projectId: 'p1',
    dueDate: '2025-01-15'
  },
  {
    id: 't2',
    title: 'API авторизации',
    description: 'Подключить JWT и refresh токены',
    status: 'progress',
    projectId: 'p3',
    dueDate: '2024-12-22'
  },
  {
    id: 't3',
    title: 'CI/CD pipeline',
    description: 'Настроить сборку и деплой',
    status: 'progress',
    projectId: 'p3',
    dueDate: '2025-01-05'
  },
  {
    id: 't4',
    title: 'Онбординг новых юзеров',
    description: 'Сценарии рассылок и подсказок',
    status: 'todo',
    projectId: 'p1',
    dueDate: '2025-01-03'
  },
  {
    id: 't5',
    title: 'Аналитика событий',
    description: 'Собрать метрики в Amplitude',
    status: 'done',
    projectId: 'p1',
    dueDate: '2024-11-30'
  },
  {
    id: 't6',
    title: 'Прототип чат-поддержки',
    description: 'Подключить WebSocket сервер',
    status: 'todo',
    projectId: 'p2',
    dueDate: '2025-01-18'
  },
  {
    id: 't7',
    title: 'Оптимизация базы',
    description: 'Индексы и план запросов',
    status: 'done',
    projectId: 'p3',
    dueDate: '2024-12-01'
  },
  {
    id: 't8',
    title: 'UX тестирование',
    description: 'Интервью с 5 пользователями',
    status: 'progress',
    projectId: 'p2',
    dueDate: '2025-01-10'
  }
];

const statusLabels: Record<TaskStatus, string> = {
  todo: 'To Do',
  progress: 'In Progress',
  done: 'Done'
};

function App() {
  const [page, setPage] = useState<Page>('home');

  const projectLookup = useMemo(
    () => Object.fromEntries(projects.map((p) => [p.id, p.name])),
    []
  );

  const kanban = useMemo(
    () =>
      (Object.keys(statusLabels) as TaskStatus[]).map((status) => ({
        status,
        items: filterTasks(tasks, status)
      })),
    []
  );

  return (
    <div className="app">
      <Navigation current={page} onNavigate={setPage} />
      <main className="content">
        {page === 'home' && <Home projects={projects} tasks={tasks} />}
        {page === 'projects' && (
          <Projects
            projects={projects}
            tasks={tasks}
            projectLookup={projectLookup}
          />
        )}
        {page === 'profile' && <Profile />}

        <section className="kanban">
          <header className="section-header">
            <div>
              <p className="eyebrow">Kanban</p>
              <h2>Задачи</h2>
            </div>
          </header>
          <div className="columns">
            {kanban.map((column) => (
              <div key={column.status} className="column">
                <div className="column-head">
                  <span className="tag">{statusLabels[column.status]}</span>
                  <span className="count">{column.items.length}</span>
                </div>
                <div className="stack">
                  {column.items.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      projectName={projectLookup[task.projectId]}
                      formattedDue={formatDate(task.dueDate)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

