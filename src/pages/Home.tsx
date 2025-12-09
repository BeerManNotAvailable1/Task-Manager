import { Project, Task } from '../types';

interface HomeProps {
  projects: Project[];
  tasks: Task[];
}

const Home = ({ projects, tasks }: HomeProps) => {
  const done = tasks.filter((t) => t.status === 'done').length;
  const total = tasks.length;

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
          <p className="muted">Всего задач</p>
          <strong>{total}</strong>
        </div>
        <div className="stat-card">
          <p className="muted">Завершено</p>
          <strong>{done}</strong>
        </div>
      </div>
    </section>
  );
};

export default Home;

