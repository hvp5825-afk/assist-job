const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const getToken = () => localStorage.getItem('access_token');

const api = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });
  if (!response.ok) throw await response.json();
  return response.json();
};

// Auth
export const register = (data: { email: string; password: string; first_name: string; role: string }) =>
  api('/auth/register/', { method: 'POST', body: JSON.stringify(data) });

export const login = (data: { email: string; password: string }) =>
  api('/auth/login/', { method: 'POST', body: JSON.stringify(data) });

export const logout = (refresh: string) =>
  api('/auth/logout/', { method: 'POST', body: JSON.stringify({ refresh }) });

export const getMe = () => api('/auth/me/');

// Jobs
export const getJobs = () => api('/jobs/');

export const createJob = (data: object) =>
  api('/jobs/', { method: 'POST', body: JSON.stringify(data) });

export const applyJob = (jobId: number, cover_letter: string) =>
  api(`/jobs/${jobId}/apply/`, { method: 'POST', body: JSON.stringify({ cover_letter }) });

export const getMyApplications = () => api('/applications/my/');

export const getJobApplicants = (jobId: number) => api(`/jobs/${jobId}/applicants/`);

// AI Chat
export const sendAIMessage = (message: string, role: string) =>
  api('/ai/chat/', { method: 'POST', body: JSON.stringify({ message, role }) });
