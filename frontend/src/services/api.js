import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const taskAPI = {
  // Get all tasks with optional status filter
  getTasks: (status = null) => {
    const params = status && status !== 'all' ? { status } : {};
    return api.get('/tasks', { params });
  },

  // Get task by ID
  getTask: (id) => {
    return api.get(`/tasks/${id}`);
  },

  // Create new task
  createTask: (taskData) => {
    return api.post('/tasks', taskData);
  },

  // Update task
  updateTask: (id, taskData) => {
    return api.put(`/tasks/${id}`, taskData);
  },

  // Toggle task completion status
  toggleTask: (id) => {
    return api.patch(`/tasks/${id}/toggle`);
  },

  // Delete task
  deleteTask: (id) => {
    return api.delete(`/tasks/${id}`);
  },

  // Health check
  healthCheck: () => {
    return api.get('/health');
  },
};

export default api; 