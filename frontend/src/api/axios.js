import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const WITH_CREDENTIALS = true;

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: WITH_CREDENTIALS,
    timeout: 15000
});

// Normalize errors to avoid leaking backend internals
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        const normalized = new Error(status === 404 ? 'Not found' : 'Request failed');
        normalized.status = status || 0;
        return Promise.reject(normalized);
    }
);

export default instance;