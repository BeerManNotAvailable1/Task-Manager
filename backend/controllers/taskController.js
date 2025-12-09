import Task from '../models/Task.model.js';

export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.query;
    const query = projectId ? { projectId } : {};
    const tasks = await Task.find(query)
      .populate('projectId', 'name')
      .populate('assignee', 'email name')
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('projectId', 'name')
      .populate('assignee', 'email name');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, status = 'todo', projectId, assignee, assigneeName, dueDate, attachments = [] } = req.body;
    if (!title || !projectId) {
      return res.status(400).json({ message: 'Title and projectId are required' });
    }
    const task = new Task({
      title,
      description: description || '',
      status,
      projectId,
      assignee,
      assigneeName,
      dueDate,
      attachments
    });
    await task.save();
    // Не делаем populate в POST - оставляем projectId как строку (ObjectId)
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    Object.assign(task, req.body);
    await task.save();
    // Не делаем populate в PUT - оставляем projectId как строку (ObjectId)
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

