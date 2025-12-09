import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';

const CreateProject = () => {
  const { addProject } = useProjects();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await addProject({ name, description });
    navigate('/projects');
  };

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">Создать проект</p>
          <h1>Новый проект</h1>
        </div>
      </div>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            <span>Название *</span>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            <span>Описание</span>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
        </div>
        <button type="submit" className="nav-btn active">
          Создать проект
        </button>
      </form>
    </section>
  );
};

export default CreateProject;

