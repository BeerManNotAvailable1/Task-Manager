const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const jsonHeaders = { 'Content-Type': 'application/json' };

const getToken = () => {
  return localStorage.getItem('token');
};

let isRedirecting = false;

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    ...jsonHeaders,
    ...(options.headers || {})
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers
    });
    
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (!isRedirecting && window.location.pathname !== '/login') {
          isRedirecting = true;
          window.location.href = '/login';
        }
        throw new Error('Unauthorized');
      }
      const msg = await res.text();
      throw new Error(msg || res.statusText);
    }
    return res.json() as Promise<T>;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

