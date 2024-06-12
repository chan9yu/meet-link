import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RouterPath } from '../../constants/router';
import { useRoomExistsQuery } from '../../hooks/queries/roomQueries';
import { RootState } from '../../store';
import * as actions from '../../store/actions';
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

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const { register, handleSubmit, getValues } = useForm<FormValues>();
	const roomId = getValues('roomId') ?? '';

	const { refetch } = useRoomExistsQuery(roomId);

	const createRoom = () => {
		navigate(RouterPath.ROOM);
	};

	const joinRoom = async (roomId: string) => {
		const { data } = await refetch();

		if (!data!.exists) {
			return setErrorMessage('Meeting not found. Check your meeting id.');
		}

		if (data!.isFull) {
			return setErrorMessage('Meeting is full. Please try again later.');
		}

		dispatch(actions.setRoomId(roomId));
		navigate(RouterPath.ROOM);
	};

	const onSubmit: SubmitHandler<FormValues> = async ({ roomId, nickname }) => {
		dispatch(actions.setIdentity(nickname));

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
				{!isRoomHost && <input className="join_room_input" placeholder="Enter meeting ID" {...register('roomId')} />}
				<input className="join_room_input" placeholder="Enter your Name" {...register('nickname')} />
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
