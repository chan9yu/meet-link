import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import Overlay from '../../components/room/Overlay';
import RoomLabel from '../../components/room/RoomLabel';
import ChatSection from '../../components/room/chat/ChatSection';
import ParticipantsSection from '../../components/room/participants/ParticipantsSection';
import VideoSection from '../../components/room/video/VideoSection';
import { rtcManager } from '../../modules/RTCManager';
import { RootState } from '../../store';
import './Room.css';

export default function Room() {
	const didMountRef = useRef(false);

	const identity = useSelector((state: RootState) => state.identity);
	const isRoomHost = useSelector((state: RootState) => state.isRoomHost);
	const roomId = useSelector((state: RootState) => state.roomId);
	const showOverlay = useSelector((state: RootState) => state.showOverlay);

	useEffect(() => {
		if (!didMountRef.current) {
			rtcManager.getLocalPreviewAndInitRoomConnection(identity, isRoomHost, roomId);
			didMountRef.current = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="room_container">
			<ParticipantsSection />
			<VideoSection />
			<ChatSection />
			<RoomLabel />
			{showOverlay && <Overlay />}
		</div>
	);
}
