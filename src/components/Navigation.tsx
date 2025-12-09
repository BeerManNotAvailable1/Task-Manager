import { NavLink, useNavigate } from 'react-router-dom';

const items = [
  { to: '/', label: 'Главная' },
  { to: '/projects', label: 'Проекты' },
  { to: '/profile', label: 'Профиль' }
];

const Navigation = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!token) {
    return null;
  }

  return (
    <nav className="nav">
      <div className="nav-brand">Task Manager</div>
      <div className="nav-list">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
            end={item.to === '/'}
          >
            {item.label}
          </NavLink>
        ))}
        <button className="nav-btn" onClick={handleLogout}>
          Выход
        </button>
      </div>
    </nav>
  );
};

export default Navigation;

