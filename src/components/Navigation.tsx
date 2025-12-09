import { NavLink } from 'react-router-dom';

const items = [
  { to: '/', label: 'Главная' },
  { to: '/projects', label: 'Проекты' },
  { to: '/profile', label: 'Профиль' }
];

const Navigation = () => (
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
    </div>
  </nav>
);

export default Navigation;

