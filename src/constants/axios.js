import axios from 'axios';
import { API_CONFIG } from './config';

export const axiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); //
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },

    (error) => {
        return Promise.reject(error)
    }
)

//agregar interceptores de respuesta

