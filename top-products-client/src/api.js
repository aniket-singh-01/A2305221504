// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your backend server URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const fetchProducts = (filters) => api.get('/categories/Laptop/products', { params: filters });
export const fetchProductById = (id) => api.get(`/categories/Laptop/products/${id}`);

export default api;
