import axios from "axios";

const BASE_URL = 'http://localhost:3000/api';

// Create axios instance with credentials
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});


axiosInstance.interceptors.request.use((config) => {
    if (config.method !== 'get') {
        // Get CSRF token from cookie or meta tag
        const csrfToken = csrfToken(); 
        if (csrfToken) {
            config.headers['X-CSRF-Token'] = csrfToken;
        }
    }
    return config;
});

export default axiosInstance;