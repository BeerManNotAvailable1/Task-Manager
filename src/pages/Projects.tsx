import { Link, useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../context/ProjectContext';
import { useTasks } from '../context/TaskContext';

const Projects = () => {
  const { projects } = useProjects();
  const { tasks } = useTasks();
  const navigate = useNavigate();

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">Проекты</p>
          <h1>Список проектов</h1>
        </div>
        <Link to="/projects/new" className="nav-btn active">
          Новый проект
        </Link>
      </div>
      <div className="grid">
        {projects.map((project) => {
          const related = tasks.filter((t) => t.projectId === project.id);
          return (
            <ProjectCard
              key={project.id}
              project={project}
              tasksTotal={related.length}
              onOpen={() => navigate(`/projects/${project.id}`)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Projects;

