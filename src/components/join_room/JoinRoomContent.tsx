import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { RouterPath } from '../../constants/router';
import useRoomConnect from '../../hooks/useRoomConnect';
import { RootState } from '../../store';
import { setIdentity } from '../../store/actions';
import ErrorMessage from './ErrorMessage';
import JoinRoomButton from './JoinRoomButton';

type FormValues = {
	roomId: string;
	nickname: string;
};

export default function JoinRoomContent() {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const isRoomHost = useSelector((state: RootState) => state.isRoomHost);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormValues>();

	const { createRoom, joinRoom, errorMessage } = useRoomConnect();

	const onSubmit: SubmitHandler<FormValues> = async ({ roomId, nickname }) => {
		dispatch(setIdentity(nickname));

		if (isRoomHost) {
			createRoom();
		} else {
			await joinRoom(roomId);
		}
	};

	const handleMoveToIntroduction = () => {
		navigate(RouterPath.INTRODUCTION);
	};

	return (
		<form className="join_room_form" onSubmit={handleSubmit(onSubmit)}>
			<div className="join_room_inputs_container">
				{!isRoomHost && (
					<input
						className="join_room_input"
						placeholder="Enter meeting ID"
						{...register('roomId', { required: 'Meeting ID is required' })}
					/>
				)}
				<input
					className="join_room_input"
					placeholder="Enter your Name"
					{...register('nickname', { required: 'Name is required' })}
				/>
			</div>
			<ErrorMessage errorMessage={errorMessage} />
			<div className="join_room_buttons_container">
				<JoinRoomButton type="submit">{isRoomHost ? 'Host' : 'Join'}</JoinRoomButton>
				<JoinRoomButton cancelButton onClick={handleMoveToIntroduction}>
					Cancel
				</JoinRoomButton>
			</div>
		</form>
	);
}
