import ProjectCard from '../components/ProjectCard';
import { Project, Task } from '../types';

interface ProjectsProps {
  projects: Project[];
  tasks: Task[];
  onOpen: (projectId: string) => void;
}

const Projects = ({ projects, tasks, onOpen }: ProjectsProps) => (
  <section className="panel">
    <div>
      <p className="eyebrow">Проекты</p>
      <h1>Список проектов</h1>
    </div>
    <div className="grid">
      {projects.map((project) => {
        const related = tasks.filter((t) => t.projectId === project.id);
        return (
          <ProjectCard
            key={project.id}
            project={project}
            tasksTotal={related.length}
            onOpen={() => onOpen(project.id)}
          />
        );
      })}
    </div>
  </section>
);

export default Projects;

