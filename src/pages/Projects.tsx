import ProjectCard from '../components/ProjectCard';
import { Project, Task } from '../types';

interface ProjectsProps {
  projects: Project[];
  tasks: Task[];
  projectLookup: Record<string, string>;
}

const Projects = ({ projects, tasks }: ProjectsProps) => (
  <section className="panel">
    <div>
      <p className="eyebrow">Проекты</p>
      <h1>Список проектов</h1>
    </div>
    <div className="grid">
      {projects.map((project) => {
        const related = tasks.filter((t) => t.projectId === project.id);
        const done = related.filter((t) => t.status === 'done').length;
        return (
          <ProjectCard
            key={project.id}
            project={project}
            tasksTotal={related.length}
            tasksDone={done}
          />
        );
      })}
    </div>
  </section>
);

export default Projects;

