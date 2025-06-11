import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export const getCategories = () => API.get('/categories');
export const getSubCategories = (categoryId: string) => API.get(`/subCategories/byCategory/${categoryId}`);
export const sendPrompt = (data: { userId: string; categoryId: string; subCategoryId: string; prompt: string }) =>
  API.post('/prompts/ask', data);
