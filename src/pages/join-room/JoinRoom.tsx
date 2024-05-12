import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import JoinRoomContent from '../../components/join_room/JoinRoomContent';
import { RootState } from '../../store';
import { setIsRoomHost } from '../../store/actions';
import './JoinRoom.css';

export default function JoinRoom() {
	const { search } = useLocation();

	const dispatch = useDispatch();
	const isRoomHost = useSelector((state: RootState) => state.isRoomHost);

	useEffect(() => {
		const isRoomHost = new URLSearchParams(search).get('host');
		if (isRoomHost) {
			dispatch(setIsRoomHost(true));
		}
	}, [dispatch, search]);

	return (
		<div className="join_room_page_container">
			<div className="join_room_page_panel">
				<p className="join_room_title">{isRoomHost ? 'Host meeting' : 'Join meeting'}</p>
				<JoinRoomContent />
			</div>
		</div>
	);
}
