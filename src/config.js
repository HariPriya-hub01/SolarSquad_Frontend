// Resolve the backend API URL dynamically based on environment configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
