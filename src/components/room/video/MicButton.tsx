import { useState } from 'react';

import mic_svg from '../../../assets/svgs/mic.svg';
import mic_off_svg from '../../../assets/svgs/micOff.svg';
import { rtcManager } from '../../../modules/RTCManager';

export default function MicButton() {
	const [isMicMuted, setIsMicMuted] = useState(false);

	const handleMicButtonPressed = () => {
		rtcManager.toggleAudio(isMicMuted);
		setIsMicMuted(prev => !prev);
	};

	return (
		<div className="video_button_container" onClick={handleMicButtonPressed}>
			<img src={isMicMuted ? mic_off_svg : mic_svg} alt="audio_toggle_button" className="video_button_image" />
		</div>
	);
}
