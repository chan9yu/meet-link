import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RouterPath } from '../../constants/router';
import { RootState } from '../../store';
import JoinRoomButton from './JoinRoomButton';

type JoinRoomButtonsProps = {
	handleJoinRoom: () => Promise<void>;
};

export default function JoinRoomButtons({ handleJoinRoom }: JoinRoomButtonsProps) {
	const navigate = useNavigate();

	const isRoomHost = useSelector((state: RootState) => state.isRoomHost);

	const handleMoveToIntroduction = () => {
		navigate(RouterPath.INTRODUCTION);
	};

	return (
		<div className="join_room_buttons_container">
			<JoinRoomButton onClick={handleJoinRoom}>{isRoomHost ? 'Host' : 'Join'}</JoinRoomButton>
			<JoinRoomButton cancelButton onClick={handleMoveToIntroduction}>
				Cancel
			</JoinRoomButton>
		</div>
	);
}
