import { useState } from 'react';
import { Task, TaskStatus } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit: (data: Partial<Task>) => Promise<unknown>;
  onDelete: () => Promise<void>;
}

const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assignee, setAssignee] = useState(task.assignee || '');
  const [status, setStatus] = useState<TaskStatus>(task.status);

  const openEdit = () => {
    setTitle(task.title);
    setDescription(task.description);
    setAssignee(task.assignee || '');
    setStatus(task.status);
    setEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onEdit({ title, description, assignee, status });
    setEditing(false);
  };

  return (
    <>
      <article className="card task">
        <div className="card-top">
          <p className="eyebrow">{task.assigneeName || task.assignee || 'Не назначено'}</p>
          <span className={`status ${task.status}`}>{task.status}</span>
        </div>
        <h4 className="task-title">{task.title}</h4>
        <p className="task-text">{task.description}</p>
        {task.attachments && task.attachments.length > 0 && (
          <div className="attachments" style={{ marginTop: 8 }}>
            {task.attachments.map((url, idx) => (
              <a
                key={idx}
                href={url.startsWith('http') ? url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pill"
                style={{ display: 'inline-block', marginRight: 6, marginBottom: 4 }}
              >
                📎 Файл {idx + 1}
              </a>
            ))}
          </div>
        )}
        <div className="meta">
          <button className="nav-btn" onClick={openEdit}>
            Редактировать
          </button>
          <button
            className="nav-btn danger"
            onClick={async () => {
              if (confirm('Удалить задачу?')) await onDelete();
            }}
          >
            Удалить
          </button>
        </div>
      </article>

      {editing && (
        <div className="modal-backdrop">
          <div className="modal">
            <h4>Редактировать задачу</h4>
            <form className="task-form" onSubmit={handleSave}>
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
                <input value={assignee} onChange={(e) => setAssignee(e.target.value)} />
              </label>
              <label>
                <span>Статус</span>
                <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
                  <option value="todo">To Do</option>
                  <option value="progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </label>
              <div className="modal-actions">
                <button type="button" className="nav-btn" onClick={() => setEditing(false)}>
                  Отмена
                </button>
                <button type="submit" className="nav-btn active">
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;

