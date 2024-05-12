import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function RoomLabel() {
	const roomId = useSelector((state: RootState) => state.roomId);

	return (
		<div className="room_label">
			<p className="room_label_paragraph">ID: {roomId}</p>
		</div>
	);
}
