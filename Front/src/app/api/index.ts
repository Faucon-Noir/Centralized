import axios from 'axios';
import router from 'next/router';

const api = axios.create({
	baseURL: process.env.API_URL,
});
api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

export default api;
