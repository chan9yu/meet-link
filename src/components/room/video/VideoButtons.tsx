import { useSelector } from 'react-redux';

import { RootState } from '../../../store';
import CameraButton from './CameraButton';
import LeaveRoomButton from './LeaveRoomButton';
import MicButton from './MicButton';
import SwitchToScreenSharingButton from './SwitchToScreenSharingButton';

export default function VideoButtons() {
	const connectOnlyWithAudio = useSelector((state: RootState) => state.connectOnlyWithAudio);

	return (
		<div className="video_buttons_container">
			<MicButton />
			{!connectOnlyWithAudio && <CameraButton />}
			<LeaveRoomButton />
			{!connectOnlyWithAudio && <SwitchToScreenSharingButton />}
		</div>
	);
}
