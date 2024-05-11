import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getRoomExists } from '../apis';
import { RouterPath } from '../constants/router';

export default function useRoomConnect() {
	const navigate = useNavigate();

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const createRoom = () => {
		navigate(RouterPath.ROOM);
	};

	const joinRoom = async (roomId: string) => {
		const response = await getRoomExists(roomId);

		if (!response.exists) {
			return setErrorMessage('Meeting not found. Check your meeting id.');
		}

		if (response.full) {
			return setErrorMessage('Meeting is full. Please try again later.');
		}

		navigate(RouterPath.ROOM);
	};

	return {
		createRoom,
		joinRoom,
		errorMessage
	};
}
