import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

// Interceptor to add token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (data: { name: string; phone: string; password: string }) =>
  apiClient.post('/auth/register', data);

export const loginUser = async (data: { name: string; password: string }) =>
  apiClient.post('/auth/login', data);

export const fetchCategories = async () =>
  apiClient.get('/categories');

export const fetchSubCategories = async (categoryId: string) =>
  apiClient.get(`/sub-categories/byCategory/${categoryId}`);

export const submitPrompt = async (data: {
  userId: string;
  categoryId: string;
  subCategoryId: string;
  prompt: string;
}) => {
  return apiClient.post('/prompts', data);
};

export const fetchUserPrompts = async (userId: string) =>
  apiClient.get(`/prompts/user/${userId}`);

export const fetchAllUsersWithPrompts = async () =>
  apiClient.get('/admin/users');
