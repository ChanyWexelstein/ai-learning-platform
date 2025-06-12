import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

// User registration
export const registerUser = async (data: { name: string; phone: string; password: string }) =>
  apiClient.post('/auth/register', data);

// Fetch all categories
export const fetchCategories = async () =>
  apiClient.get('/categories');

// Updated route to match backend
export const fetchSubCategories = async (categoryId: string) =>
  apiClient.get(`/sub-categories/byCategory/${categoryId}`);

// Submit a prompt and get AI-generated response
export const submitPrompt = async (data: {
  userId: string;
  categoryId: string;
  subCategoryId: string;
  prompt: string;
}) => {
  return apiClient.post('/prompts', data)
};

// Get prompt history for a specific user
export const fetchUserPrompts = async (userId: string) =>
  apiClient.get(`/prompts/user/${userId}`);

// Get all users (for admin)
export const fetchAllUsers = async () =>
  apiClient.get('/users');

// Get all prompts (for admin)
export const fetchAllPrompts = async () =>
  apiClient.get('/prompts');
