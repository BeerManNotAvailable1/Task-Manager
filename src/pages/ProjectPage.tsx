import { useMemo, useState } from 'react';
import TaskCard from '../components/TaskCard';
import { Task, TaskStatus, Project } from '../types';

interface ProjectPageProps {
  project: Project;
  tasks: Task[];
  statusLabels: Record<TaskStatus, string>;
  onBack: () => void;
  onCreate: (task: Omit<Task, 'id' | 'projectId'>) => void;
  onMove: (taskId: string, direction: 'left' | 'right') => void;
}

const statusOptions: TaskStatus[] = ['todo', 'progress', 'done'];
const assigneeOptions = ['Анна', 'Ирина', 'Сергей', 'Даниил', 'Виктор', 'Марина', 'Юлия'];

const ProjectPage = ({
  project,
  tasks,
  statusLabels,
  onBack,
  onCreate,
  onMove
}: ProjectPageProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState(assigneeOptions[0]);
  const [status, setStatus] = useState<TaskStatus>('todo');

  const kanban = useMemo(
    () =>
      statusOptions.map((key) => ({
        status: key,
        items: tasks.filter((t) => t.status === key)
      })),
    [tasks]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({ title, description, assignee, status });
    setTitle('');
    setDescription('');
    setAssignee(assigneeOptions[0]);
    setStatus('todo');
  };

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">Проект</p>
          <h1>{project.name}</h1>
        </div>
        <button className="nav-btn" onClick={onBack}>
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
                    <TaskCard task={task} />
                    <div className="move-controls">
                      <button
                        type="button"
                        className="nav-btn"
                        onClick={() => onMove(task.id, 'left')}
                      >
                        {'<'}
                      </button>
                      <button
                        type="button"
                        className="nav-btn"
                        onClick={() => onMove(task.id, 'right')}
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
        </div>
        <button type="submit" className="nav-btn active">
          Создать задачу
        </button>
      </form>
    </section>
  );
};

export default ProjectPage;

