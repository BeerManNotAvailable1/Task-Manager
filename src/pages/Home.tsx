import { Project, Task } from '../types';
import { formatDate } from '../utils/dateHelpers';

interface HomeProps {
  projects: Project[];
  tasks: Task[];
}

const Home = ({ projects, tasks }: HomeProps) => {
  const done = tasks.filter((t) => t.status === 'done').length;
  const progress = tasks.filter((t) => t.status === 'progress').length;
  const nextDue = [...tasks].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  )[0];

  return (
    <section className="panel">
      <div>
        <p className="eyebrow">Главная</p>
        <h1>Статистика</h1>
      </div>
      <div className="stats">
        <div className="stat-card">
          <p className="muted">Проекты</p>
          <strong>{projects.length}</strong>
        </div>
        <div className="stat-card">
          <p className="muted">В работе</p>
          <strong>{progress}</strong>
        </div>
        <div className="stat-card">
          <p className="muted">Завершено</p>
          <strong>{done}</strong>
        </div>
        <div className="stat-card">
          <p className="muted">Ближайший дедлайн</p>
          <strong>{nextDue ? formatDate(nextDue.dueDate) : '—'}</strong>
        </div>
      </div>
    </section>
  );
};

export default Home;

