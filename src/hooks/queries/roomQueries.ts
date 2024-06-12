import { useQuery } from '@tanstack/react-query';
import * as roomApis from '../../apis/roomApi';

const roomKeys = {
	all: ['rooms'] as const,
	exists: (roomId: string) => [...roomKeys.all, 'exists', roomId] as const,
	turnInfo: () => [...roomKeys.all, 'turn-info'] as const
};

export const useRoomExistsQuery = (roomId: string) => {
	const query = useQuery({
		queryKey: roomKeys.exists(roomId),
		queryFn: () => roomApis.fetchRoomExists(roomId),
		enabled: false,
		refetchOnWindowFocus: false
	});

	return query;
};

export const useTurnInfoQuery = () => {
	const query = useQuery({
		queryKey: roomKeys.turnInfo(),
		queryFn: () => roomApis.fetchTurnInfo()
	});

	return query;
};
