import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';

type JoinRoomInputsProps = {
	nickname: string;
	roomId: string;
	setNickname: Dispatch<SetStateAction<string>>;
	setRoomId: Dispatch<SetStateAction<string>>;
};

export default function JoinRoomInputs({ nickname, roomId, setNickname, setRoomId }: JoinRoomInputsProps) {
	const isRoomHost = useSelector((state: RootState) => state.isRoomHost);

	const handleRoomIdChange = (event: ChangeEvent<HTMLInputElement>) => {
		setRoomId(event.target.value);
	};

	const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
		setNickname(event.target.value);
	};

	return (
		<div className="join_room_inputs_container">
			{!isRoomHost && (
				<input
					className="join_room_input"
					placeholder="Enter meeting ID"
					value={roomId}
					onChange={handleRoomIdChange}
				/>
			)}
			<input
				className="join_room_input"
				placeholder="Enter your Name"
				value={nickname}
				onChange={handleNicknameChange}
			/>
		</div>
	);
}
