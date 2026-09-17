import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // Endereço padrão do Spring Boot
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;