import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RouterPath } from '../../constants/router';
import { RootState } from '../../store';
import JoinButton from './JoinButton';

type JoinRoomButtonsProps = {
	handleJoinRoom: () => Promise<void>;
};

export default function JoinRoomButtons({ handleJoinRoom }: JoinRoomButtonsProps) {
	const navigate = useNavigate();

	const isRoomHost = useSelector((state: RootState) => state.isRoomHost);
	const successButtonText = isRoomHost ? 'Host' : 'Join';

	const handleMoveToIntroduction = () => {
		navigate(RouterPath.INTRODUCTION);
	};

	return (
		<div className="join_room_buttons_container">
			<JoinButton onClick={handleJoinRoom}>{successButtonText}</JoinButton>
			<JoinButton cancelButton onClick={handleMoveToIntroduction}>
				Cancel
			</JoinButton>
		</div>
	);
}
