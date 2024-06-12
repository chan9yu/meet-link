import type { RoomExistsResponse, TurnInfoResponse } from '../models/roomModel';
import { axiosInstance } from './instance';

export const fetchRoomExists = async (roomId: string): Promise<RoomExistsResponse> => {
	const response = await axiosInstance.get(`/rooms/exists/${roomId}`);
	return response.data;
};

export const fetchTurnInfo = async (): Promise<TurnInfoResponse> => {
	const response = await axiosInstance.get(`/turn-info`);
	return response.data;
};
