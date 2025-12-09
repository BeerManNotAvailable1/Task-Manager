import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { v4 as uuid } from 'uuid';

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const projects = [
  { id: 'p1', name: 'Web App', description: 'Клиентский портал' },
  { id: 'p2', name: 'Mobile App', description: 'Приложение для продаж' },
  { id: 'p3', name: 'Backend', description: 'Сервис API и интеграции' }
];

const tasks = [
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
  }
];

// Projects
app.get('/api/projects', (_req, res) => res.json(projects));

app.get('/api/projects/:id', (req, res) => {
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) return res.status(404).json({ message: 'Not found' });
  res.json(project);
});

app.post('/api/projects', (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const project = { id: uuid(), name, description };
  projects.push(project);
  res.status(201).json(project);
});

app.put('/api/projects/:id', (req, res) => {
  const idx = projects.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  projects[idx] = { ...projects[idx], ...req.body };
  res.json(projects[idx]);
});

app.delete('/api/projects/:id', (req, res) => {
  const idx = projects.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  const [removed] = projects.splice(idx, 1);
  res.json(removed);
});

// Tasks
app.get('/api/tasks', (req, res) => {
  const { projectId } = req.query;
  if (projectId) {
    return res.json(tasks.filter((t) => t.projectId === projectId));
  }
  res.json(tasks);
});

app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ message: 'Not found' });
  res.json(task);
});

app.post('/api/tasks', (req, res) => {
  const { title, description, status = 'todo', projectId, assignee } = req.body;
  if (!title || !projectId) return res.status(400).json({ message: 'Title and projectId are required' });
  const task = { id: uuid(), title, description: description ?? '', status, projectId, assignee };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/api/tasks/:id', (req, res) => {
  const idx = tasks.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  tasks[idx] = { ...tasks[idx], ...req.body };
  res.json(tasks[idx]);
});

app.delete('/api/tasks/:id', (req, res) => {
  const idx = tasks.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  const [removed] = tasks.splice(idx, 1);
  res.json(removed);
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

