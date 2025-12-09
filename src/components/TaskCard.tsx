import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  projectName: string;
  formattedDue: string;
}

const TaskCard = ({ task, projectName, formattedDue }: TaskCardProps) => (
  <article className="card task">
    <div className="card-top">
      <p className="eyebrow">{projectName}</p>
      <span className={`status ${task.status}`}>{task.status}</span>
    </div>
    <h4>{task.title}</h4>
    <p className="muted">{task.description}</p>
    <div className="meta">
      <span className="pill">Дедлайн: {formattedDue}</span>
    </div>
  </article>
);

export default TaskCard;

