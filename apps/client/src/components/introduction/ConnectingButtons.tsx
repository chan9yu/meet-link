import { useNavigate } from 'react-router-dom';

import { RouterPath } from '../../constants/router';
import ConnectingButton from './ConnectingButton';

export default function ConnectingButtons() {
	const navigate = useNavigate();

	const handleMoveToJoinRoom = () => {
		navigate(RouterPath.JOIN_ROOM);
	};

	const handleMoveToJoinRoomAsHost = () => {
		navigate(`${RouterPath.JOIN_ROOM}?host=true`);
	};

	return (
		<div className="connecting_buttons_container">
			<ConnectingButton onClick={handleMoveToJoinRoom}>Join a meeting</ConnectingButton>
			<ConnectingButton createRoomButton onClick={handleMoveToJoinRoomAsHost}>
				Host a meeting
			</ConnectingButton>
		</div>
	);
}
