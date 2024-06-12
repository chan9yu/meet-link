import axios from 'axios';

const SERVER_URL = 'http://localhost:8080/api' as const;

export const axiosInstance = axios.create({
	baseURL: SERVER_URL,
	withCredentials: true
});
