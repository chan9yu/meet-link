import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RouterPath } from '../../constants/router';
import { RootState } from '../../store';
import { setIdentity } from '../../store/actions';
import ErrorMessage from './ErrorMessage';
import JoinRoomButtons from './JoinRoomButtons';
import JoinRoomInputs from './JoinRoomInputs';
import OnlyWithAudioCheckbox from './OnlyWithAudioCheckbox';

export default function JoinRoomContent() {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const isRoomHost = useSelector((state: RootState) => state.isRoomHost);

	const [roomIdValue, setRoomIdValue] = useState('');
	const [nameValue, setNameValue] = useState('');
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const createRoom = () => {
		navigate(RouterPath.ROOM);
	};

	const joinRoom = async () => {
		setErrorMessage('Meeting not found. Check your meeting id.');
	};

	const handleJoinRoom = async () => {
		dispatch(setIdentity(nameValue));

		if (isRoomHost) {
			createRoom();
		} else {
			await joinRoom();
		}
	};

	return (
		<>
			<JoinRoomInputs
				roomIdValue={roomIdValue}
				setRoomIdValue={setRoomIdValue}
				nameValue={nameValue}
				setNameValue={setNameValue}
			/>
			<OnlyWithAudioCheckbox />
			<ErrorMessage errorMessage={errorMessage} />
			<JoinRoomButtons handleJoinRoom={handleJoinRoom} />
		</>
	);
}
