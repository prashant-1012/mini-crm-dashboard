import axios from 'axios';

// TypeScript note: axios.create() returns an AxiosInstance type.
// We're not annotating it explicitly because TypeScript can infer it —
// only annotate when inference fails or the type needs to be exported.
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — good place to attach auth tokens later
axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — centralized error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You could dispatch a global toast/notification here later
    console.error('[API Error]', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;