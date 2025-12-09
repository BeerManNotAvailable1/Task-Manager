import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ProjectProvider } from './context/ProjectContext';
import { TaskProvider } from './context/TaskContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProjectProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </ProjectProvider>
    </BrowserRouter>
  </React.StrictMode>
);

