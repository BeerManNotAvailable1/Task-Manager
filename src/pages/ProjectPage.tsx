import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import { TaskStatus } from '../types';
import { useTasks } from '../context/TaskContext';
import { useProjects } from '../context/ProjectContext';
import { uploadFile } from '../api/uploadApi';
import { getProjectId } from '../utils/projectIdHelper';

interface ProjectPageProps {
  statusLabels: Record<TaskStatus, string>;
}

const statusOptions: TaskStatus[] = ['todo', 'progress', 'done'];
const assigneeOptions = ['Анна', 'Ирина', 'Сергей', 'Даниил', 'Виктор', 'Марина', 'Юлия'];

const ProjectPage = ({ statusLabels }: ProjectPageProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const { tasks, addTask, moveTask, updateTask, deleteTask } = useTasks();
  const project = projects.find((p) => p.id === id);
  const projectTasks = tasks.filter((t) => getProjectId(t) === id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState(assigneeOptions[0]);
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const kanban = useMemo(
    () =>
      statusOptions.map((key) => ({
        status: key,
        items: projectTasks.filter((t) => t.status === key)
      })),
    [projectTasks]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (!project) return;

    let attachments: string[] = [];
    if (file) {
      setUploading(true);
      try {
        const result = await uploadFile(file);
        attachments = [result.url];
      } catch (err) {
        console.error('Upload failed:', err);
        alert('Ошибка загрузки файла');
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    await addTask({
      title,
      description,
      assigneeName: assignee,
      status,
      projectId: project.id,
      attachments
    });
    setTitle('');
    setDescription('');
    setAssignee(assigneeOptions[0]);
    setStatus('todo');
    setFile(null);
  };

  if (!project) {
    return (
      <section className="panel">
        <p className="eyebrow">Проект</p>
        <h1>Проект не найден</h1>
        <button className="nav-btn" onClick={() => navigate('/projects')}>
          К списку проектов
        </button>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">Проект</p>
          <h1>{project.name}</h1>
        </div>
        <button className="nav-btn" onClick={() => navigate('/projects')}>
          Назад к списку проектов
        </button>
      </div>

      <div className="kanban">
        <div className="columns">
          {kanban.map((column) => (
            <div key={column.status} className="column">
              <div className="column-head">
                <span className="tag">{statusLabels[column.status]}</span>
                <span className="count">{column.items.length}</span>
              </div>
              <div className="stack">
                {column.items.map((task) => (
                  <div key={task.id} className="task-row">
                    <TaskCard
                      task={task}
                      onEdit={(data) => updateTask(task.id, data)}
                      onDelete={async () => {
                        if (confirm('Удалить задачу?')) await deleteTask(task.id);
                      }}
                    />
                    <div className="move-controls">
                      <button
                        type="button"
                        className="nav-btn"
                        onClick={() => moveTask(task.id, 'left')}
                      >
                        {'<'}
                      </button>
                      <button
                        type="button"
                        className="nav-btn"
                        onClick={() => moveTask(task.id, 'right')}
                      >
                        {'>'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <h3>Новая задача</h3>
        <div className="form-grid">
          <label>
            <span>Название *</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            <span>Описание</span>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <label>
            <span>Исполнитель</span>
            <select value={assignee} onChange={(e) => setAssignee(e.target.value)}>
              {assigneeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Статус</span>
            <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {statusLabels[opt]}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Файл</span>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              disabled={uploading}
            />
            {file && <p className="muted" style={{ fontSize: 12, marginTop: 4 }}>{file.name}</p>}
          </label>
        </div>
        <button type="submit" className="nav-btn active" disabled={uploading}>
          {uploading ? 'Загрузка...' : 'Создать задачу'}
        </button>
      </form>
    </section>
  );
};

export default ProjectPage;

