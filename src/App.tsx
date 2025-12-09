import Navigation from './components/Navigation';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Profile from './pages/Profile';
import ProjectPage from './pages/ProjectPage';
import CreateProject from './pages/CreateProject';
import { useProjects } from './context/ProjectContext';
import { useTasks } from './context/TaskContext';
import { Routes, Route } from 'react-router-dom';
import { TaskStatus } from './types';
import './App.css';

const statusLabels: Record<TaskStatus, string> = {
  todo: 'To Do',
  progress: 'In Progress',
  done: 'Done'
};

function App() {
  const { projects } = useProjects();
  const { tasks } = useTasks();

  return (
    <div className="app">
      <Navigation />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home projects={projects} tasks={tasks} />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<CreateProject />} />
          <Route path="/projects/:id" element={<ProjectPage statusLabels={statusLabels} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

