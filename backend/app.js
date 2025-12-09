import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import './db.js';

import { authMiddleware } from './middleware/auth.js';
import * as authController from './controllers/authController.js';
import * as projectController from './controllers/projectController.js';
import * as taskController from './controllers/taskController.js';
import { uploadSingle } from './middleware/upload.js';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000; // Порт 5000 по умолчанию

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
app.use('/uploads', express.static(path.join(__dirname, UPLOAD_DIR)));

// Health check endpoint (public)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth routes
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);
app.get('/api/auth/profile', authMiddleware, authController.getProfile);

// Project routes (protected)
app.get('/api/projects', authMiddleware, projectController.getProjects);
app.get('/api/projects/:id', authMiddleware, projectController.getProject);
app.post('/api/projects', authMiddleware, projectController.createProject);
app.put('/api/projects/:id', authMiddleware, projectController.updateProject);
app.delete('/api/projects/:id', authMiddleware, projectController.deleteProject);

// Task routes (protected)
app.get('/api/tasks', authMiddleware, taskController.getTasks);
app.get('/api/tasks/:id', authMiddleware, taskController.getTask);
app.post('/api/tasks', authMiddleware, taskController.createTask);
app.put('/api/tasks/:id', authMiddleware, taskController.updateTask);
app.delete('/api/tasks/:id', authMiddleware, taskController.deleteTask);

// Upload route
app.post('/api/upload', authMiddleware, uploadSingle, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ url: `/uploads/${req.file.filename}` });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ API running on http://0.0.0.0:${PORT}`);
  console.log(`✅ API accessible at http://localhost:${PORT}`);
});
