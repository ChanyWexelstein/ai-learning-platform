import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    if (config.headers) {
      delete config.headers.Authorization;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        console.warn('Unauthorized – maybe redirect to login');
      } else if (status === 500) {
        console.error('Server error');
      }
    } else {
      console.error('Network or unexpected error:', error.message);
    }
    return Promise.reject(error);
  }
);

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

export const fetchAllUsers = async () =>
  apiClient.get('/users');

export const fetchUserPrompts = async (userId: string) =>
  apiClient.get(`/prompts/user/${userId}`);
