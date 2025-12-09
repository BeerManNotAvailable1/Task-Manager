import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  tasksTotal: number;
  onOpen: () => void;
}

const ProjectCard = ({ project, tasksTotal, onOpen }: ProjectCardProps) => (
  <article className="card">
    <h4>{project.name}</h4>
    <p className="muted">Задач: {tasksTotal}</p>
    <button className="nav-btn active" onClick={onOpen}>
      Открыть
    </button>
  </article>
);

export default ProjectCard;

