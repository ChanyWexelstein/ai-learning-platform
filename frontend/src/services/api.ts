import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

// Register a new user
export const registerUser = (data: { name: string; phone: string }) =>
  API.post('/auth/register', data);

// Get all categories
export const getCategories = () => API.get('/categories');

// Get sub-categories by category ID
export const getSubCategories = (categoryId: string) =>
  API.get(`/subCategories/byCategory/${categoryId}`);

// Send a prompt to the AI
export const sendPrompt = (data: {
  userId: string;
  categoryId: string;
  subCategoryId: string;
  prompt: string;
}) => API.post('/prompts/ask', data);

// Get prompt history by user ID
export const getUserPrompts = (userId: string) =>
  API.get(`/prompts/byUser/${userId}`);

// Get all users (for admin)
export const getAllUsers = () => API.get('/users');

// Get all prompts (for admin)
export const getAllPrompts = () => API.get('/prompts');
