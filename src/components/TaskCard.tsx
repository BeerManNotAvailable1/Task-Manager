import { Task } from '../types';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => (
  <article className="card task">
    <div className="card-top">
      <p className="eyebrow">{task.assignee || 'Не назначено'}</p>
      <span className={`status ${task.status}`}>{task.status}</span>
    </div>
    <h4 className="task-title">{task.title}</h4>
    <p className="task-text">{task.description}</p>
  </article>
);

export default TaskCard;

