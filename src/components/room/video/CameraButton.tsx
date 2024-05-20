import { useState } from 'react';

import camera_svg from '../../../assets/svgs/camera.svg';
import camera_off_svg from '../../../assets/svgs/cameraOff.svg';
import { rtcManager } from '../../../modules/RTCManager';

export default function CameraButton() {
	const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false);

	const handleCameraButtonPressed = () => {
		rtcManager.toggleVideo(isLocalVideoDisabled);
		setIsLocalVideoDisabled(prev => !prev);
	};

	return (
		<div className="video_button_container">
			<img
				src={isLocalVideoDisabled ? camera_off_svg : camera_svg}
				alt="video_toggle_button"
				className="video_button_image"
				onClick={handleCameraButtonPressed}
			/>
		</div>
	);
}
