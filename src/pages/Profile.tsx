import { useEffect, useState } from 'react';
import { getProfile } from '../api/authApi';
import { User } from '../types';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (err) {
        console.error('Failed to load profile:', err);
        const stored = localStorage.getItem('user');
        if (stored) {
          try {
            const parsedUser = JSON.parse(stored) as User;
            setUser(parsedUser);
          } catch (parseErr) {
            console.error('Failed to parse stored user:', parseErr);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) {
    return (
      <section className="panel">
        <p>Загрузка...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="panel">
        <p>Не удалось загрузить профиль</p>
      </section>
    );
  }

  const initials = user.email.substring(0, 2).toUpperCase();

  return (
    <section className="panel">
      <div>
        <p className="eyebrow">Профиль</p>
        <h1>Мой профиль</h1>
      </div>
      <div className="profile">
        <div className="avatar">{initials}</div>
        <div>
          <h3>{user.name || user.email}</h3>
          <p className="muted">{user.email}</p>
          <p className="muted">Роль: {user.role === 'admin' ? 'Администратор' : 'Участник'}</p>
        </div>
      </div>
    </section>
  );
};

export default Profile;

