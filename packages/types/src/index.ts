export type RoomExistsResponse = {
	exists: boolean;
	full?: boolean;
};

export type CreateRoomMessage = {
	identity: string;
};

export type JoinRoomMessage = {
	identity: string;
	roomId: string;
};

export type User = {
	id: string;
	identity: string;
	roomId: string;
	socketId: string;
};
