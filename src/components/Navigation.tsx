type NavItem = {
  key: 'home' | 'projects' | 'profile';
  label: string;
};

const items: NavItem[] = [
  { key: 'home', label: 'Главная' },
  { key: 'projects', label: 'Проекты' },
  { key: 'profile', label: 'Профиль' }
];

interface NavigationProps {
  current: NavItem['key'];
  onNavigate: (key: NavItem['key']) => void;
}

const Navigation = ({ current, onNavigate }: NavigationProps) => (
  <nav className="nav">
    <div className="nav-brand">Task Manager</div>
    <div className="nav-list">
      {items.map((item) => (
        <button
          key={item.key}
          className={`nav-btn ${current === item.key ? 'active' : ''}`}
          onClick={() => onNavigate(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  </nav>
);

export default Navigation;

