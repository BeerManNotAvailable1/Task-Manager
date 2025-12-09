const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const uploadFile = async (file: File): Promise<{ url: string }> => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || res.statusText);
  }

  return res.json();
};

