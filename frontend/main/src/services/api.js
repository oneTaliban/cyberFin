import axios from 'axios';


const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptors to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
                    refresh: refreshToken,
                });

                const { access } = response.data;
                localStorage.setItem('access_token', access);
                originalRequest.headers.Authorization = `Bearer ${token}`;

                return api(originalRequest);
            } catch (refreshError) {
                //Redirect to login
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


//Api endpoints 

export const expenseAPI = {
    getAll: () => api.get('/expenses/'),
    getById: (id) => api.get(`/expenses/${id}/`),
    create: (data) => api.post(`/expenses/`, data),
    update: (id, data) => api.put(`/expenses/${id}/`, data),
    delete: (id) => api.post(`/expenses/${id}`),
    getStats: () => api.get('/expenses/stats/'),
    getMonthlySummary: () => api.get('/expenses/monthly-summary/'),
}

export const taskAPI = {
    getAll: () => api.get('/tasks/'),
    getById: (id) => api.get(`/tasks/${id}/`),
    create: (data) => api.post(`/tasks/`, data),
    update: (id, data) => api.put(`/tasks/${id}/`, data),
    delete: (id) => api.post(`/tasks/${id}`),
    getStats: () => api.get('/tasks/stats/'),
};

export const authAPI = {
    login: (credentials) => api.post('/token/', credentials),
    register: (userData) => api.post('/auth/register/', userData),
    refresh: (refreshToken) => api.post('/token/refresh/', refreshToken),
    logout: () => api.post('/auth/logout/'),
}

const credentials = {
    username: 'AdminKevo',
    password: 'Moneey62',
};

authAPI.login(credentials);
export default api;