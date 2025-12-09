const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const jsonHeaders = { 'Content-Type': 'application/json' };

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...jsonHeaders,
      ...(options.headers || {})
    }
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || res.statusText);
  }
  return res.json() as Promise<T>;
}

