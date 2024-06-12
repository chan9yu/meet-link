export type RoomExistsResponse = {
	exists: boolean;
	isFull?: boolean;
};

type TurnServer = {
	credential?: string;
	username?: string;
	url?: string;
	urls?: string;
};

export type TurnInfoResponse = {
	turnServers: TurnServer[] | null;
	message?: string;
};
