import { useState } from 'react';

import switch_to_screen_sharing_svg from '../../../assets/svgs/switchToScreenSharing.svg';
import LocalScreenSharingPreview from './LocalScreenSharingPreview';
import { rtcManager } from '../../../modules/RTCManager';

const CONSTRAINTS: DisplayMediaStreamOptions = {
	audio: false,
	video: true
};

export default function SwitchToScreenSharingButton() {
	const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
	const [screenSharingStream, setScreenSharingStream] = useState<MediaStream | null>(null);

	const startScreenSharing = async () => {
		try {
			const stream = await navigator.mediaDevices.getDisplayMedia(CONSTRAINTS);
			rtcManager.toggleScreenShare(false, stream);
			setIsScreenSharingActive(true);
			setScreenSharingStream(stream);
		} catch (error) {
			console.error(`error occurred when trying to get an access to screen share stream:: ${error}`);
		}
	};

	const stopScreenSharing = () => {
		rtcManager.toggleScreenShare(true);
		screenSharingStream?.getTracks().forEach(track => track.stop());
		setIsScreenSharingActive(false);
		setScreenSharingStream(null);
	};

	const handleScreenShareToggle = () => {
		if (isScreenSharingActive) {
			stopScreenSharing();
		} else {
			startScreenSharing();
		}
	};

	return (
		<>
			<div className="video_button_container" onClick={handleScreenShareToggle}>
				<img src={switch_to_screen_sharing_svg} alt="switch_to_screen_sharing" className="video_button_image" />
			</div>
			{isScreenSharingActive && <LocalScreenSharingPreview stream={screenSharingStream as MediaStream} />}
		</>
	);
}
