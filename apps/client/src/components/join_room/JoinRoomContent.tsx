import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useRoomConnect from '../../hooks/useRoomConnect';
import { RootState } from '../../store';
import { setIdentity } from '../../store/actions';
import ErrorMessage from './ErrorMessage';
import JoinRoomButtons from './JoinRoomButtons';
import JoinRoomInputs from './JoinRoomInputs';
import OnlyWithAudioCheckbox from './OnlyWithAudioCheckbox';

export default function JoinRoomContent() {
	const dispatch = useDispatch();
	const isRoomHost = useSelector((state: RootState) => state.isRoomHost);

	const [roomId, setRoomId] = useState('');
	const [nickname, setNickname] = useState('');

	const { createRoom, joinRoom, errorMessage } = useRoomConnect();

	const handleJoinRoom = async () => {
		dispatch(setIdentity(nickname));

		if (isRoomHost) {
			createRoom();
		} else {
			await joinRoom(roomId);
		}
	};

	return (
		<>
			<JoinRoomInputs roomId={roomId} setRoomId={setRoomId} nickname={nickname} setNickname={setNickname} />
			<OnlyWithAudioCheckbox />
			<ErrorMessage errorMessage={errorMessage} />
			<JoinRoomButtons handleJoinRoom={handleJoinRoom} />
		</>
	);
}
