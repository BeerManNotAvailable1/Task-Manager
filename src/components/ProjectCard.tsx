import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  tasksTotal: number;
  tasksDone: number;
}

const ProjectCard = ({ project, tasksDone, tasksTotal }: ProjectCardProps) => (
  <article className="card">
    <div className="card-top">
      <p className="eyebrow">{project.owner}</p>
      <span className="pill">{project.name}</span>
    </div>
    <h4>{project.description}</h4>
    <div className="meta">
      <span className="muted">Создано: {project.createdAt}</span>
      <span className="pill muted">
        Готово {tasksDone}/{tasksTotal}
      </span>
    </div>
  </article>
);

export default ProjectCard;

