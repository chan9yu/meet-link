import RoomLabel from '../../components/room/RoomLabel';
import ChatSection from '../../components/room/chat/ChatSection';
import ParticipantsSection from '../../components/room/participants/ParticipantsSection';
import VideoSection from '../../components/room/video/VideoSection';
import './Room.css';

export default function Room() {
	return (
		<div className="room_container">
			<ParticipantsSection />
			<VideoSection />
			<ChatSection />
			<RoomLabel />
		</div>
	);
}
