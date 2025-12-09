import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../api/authApi';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = isLogin
        ? await login({ email, password })
        : await register({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Ошибка авторизации');
    }
  };

  return (
    <div className="panel" style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      {error && <p style={{ color: '#dc2626', marginBottom: 10 }}>{error}</p>}
      <form onSubmit={handleSubmit} className="task-form">
        <label>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Пароль</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="nav-btn active">
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
      <button 
        onClick={() => setIsLogin(!isLogin)}
        className="nav-btn"
        style={{ marginTop: 10, width: '100%' }}
      >
        {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Есть аккаунт? Войти'}
      </button>
    </div>
  );
};

export default Login;