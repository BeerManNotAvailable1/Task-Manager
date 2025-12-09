import { useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Profile from './pages/Profile';
import ProjectPage from './pages/ProjectPage';
import CreateProject from './pages/CreateProject';
import Login from './pages/Login';
import { useProjects } from './context/ProjectContext';
import { useTasks } from './context/TaskContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TaskStatus } from './types';
import './App.css';

const statusLabels: Record<TaskStatus, string> = {
  todo: 'To Do',
  progress: 'In Progress',
  done: 'Done'
};

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const { projects } = useProjects();
  const { tasks } = useTasks();

  return (
    <div className="app">
      {!isLoginPage && <Navigation />}
      <main className="content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home projects={projects} tasks={tasks} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/new"
            element={
              <ProtectedRoute>
                <CreateProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectPage statusLabels={statusLabels} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

