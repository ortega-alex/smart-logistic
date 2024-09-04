import axios from 'axios';

export const Interceptor = () => {
    axios.interceptors.request.use(
        config => {
            const token = null;
            if (!token) config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        error => Promise.reject(error)
    );

    axios.interceptors.response.use(
        response => {
            if (typeof response.data !== 'object') return Promise.reject(new Error('la respuesta no es un json'));
            return response;
        },
        error => Promise.reject(error)
    );
};
