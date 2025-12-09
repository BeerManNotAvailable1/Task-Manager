import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import Project from './models/Project.model.js';
import Task from './models/Task.model.js';
import User from './models/User.model.js';
import upload from './middleware/upload.js';
import path from 'path';
import { fileURLToPath } from 'url';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Загрузка файлов
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// Projects CRUD
app.get('/api/projects', async (_req, res) => {
  try {
    const projects = await Project.find().populate('members', 'email role');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('members', 'email role');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const { name, description, members = [], coverImage } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    
    const project = new Project({
      name,
      description,
      members,
      coverImage
    });
    
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('members', 'email role');
    
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    // Удаляем все задачи проекта
    await Task.deleteMany({ project: req.params.id });
    
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tasks CRUD
app.get('/api/tasks', async (req, res) => {
  try {
    const { projectId } = req.query;
    const filter = projectId ? { project: projectId } : {};
    
    const tasks = await Task.find(filter)
      .populate('project', 'name')
      .populate('assignee', 'email');
    
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('project', 'name')
      .populate('assignee', 'email');
    
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description, status = 'todo', project, assignee, attachments = [] } = req.body;
    
    if (!title || !project) {
      return res.status(400).json({ message: 'Title and project are required' });
    }
    
    // Проверяем существование проекта
    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const task = new Task({
      title,
      description: description || '',
      status,
      project,
      assignee,
      attachments
    });
    
    await task.save();
    
    // Загружаем полные данные для ответа
    const populatedTask = await Task.findById(task._id)
      .populate('project', 'name')
      .populate('assignee', 'email');
    
    res.status(201).json(populatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('project', 'name')
      .populate('assignee', 'email');
    
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Users (базовые роуты для ЛР6)
app.get('/api/users', async (_req, res) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { email, password, role = 'member' } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Проверка существующего пользователя
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // В ЛР6 добавим хеширование пароля
    const user = new User({
      email,
      passwordHash: password, // временно, в ЛР6 заменим на bcrypt
      role
    });
    
    await user.save();
    
    const userResponse = user.toJSON();
    res.status(201).json(userResponse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});