/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { useState } from 'react';
import switch_to_screen_sharing_svg from '../../../assets/svgs/switchToScreenSharing.svg';

const CONSTRAINTS = {
	audio: false,
	video: true
};

export default function SwitchToScreenSharingButton() {
	const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
	const [screenSharingStream, setScreenSharingStream] = useState<MediaStream | null>(null);

	const handleScreenShareToggle = () => {
		setIsScreenSharingActive(prev => !prev);
	};

	return (
		<>
			<div className="video_button_container">
				<img
					src={switch_to_screen_sharing_svg}
					alt="switch_to_screen_sharing"
					className="video_button_image"
					onClick={handleScreenShareToggle}
				/>
			</div>
		</>
	);
}
