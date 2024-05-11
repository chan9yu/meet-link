import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';

type JoinRoomInputsProps = {
	nameValue: string;
	roomIdValue: string;
	setNameValue: Dispatch<SetStateAction<string>>;
	setRoomIdValue: Dispatch<SetStateAction<string>>;
};

export default function JoinRoomInputs({ nameValue, roomIdValue, setNameValue, setRoomIdValue }: JoinRoomInputsProps) {
	const isRoomHost = useSelector((state: RootState) => state.isRoomHost);

	const handleRoomIdValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		setRoomIdValue(event.target.value);
	};

	const handleNameValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		setNameValue(event.target.value);
	};

	return (
		<div className="join_room_inputs_container">
			{!isRoomHost && (
				<input
					className="join_room_input"
					placeholder="Enter meeting ID"
					value={roomIdValue}
					onChange={handleRoomIdValueChange}
				/>
			)}
			<input
				className="join_room_input"
				placeholder="Enter your Name"
				value={nameValue}
				onChange={handleNameValueChange}
			/>
		</div>
	);
}
