import axios from 'axios';
import type { RoomExistsResponse } from './model';

const SERVER_URL = 'http://localhost:8080/api' as const;

const axiosInstance = axios.create({
	baseURL: SERVER_URL,
	withCredentials: true
});

export const getRoomExists = async (roomId: string): Promise<RoomExistsResponse> => {
	const response = await axiosInstance.get(`/room-exists/${roomId}`);
	return response.data;
};

export const getTURNCredentials = async (): Promise<string> => {
	const response = await axiosInstance.get(`/get-turn-credentials`);
	return response.data;
};
