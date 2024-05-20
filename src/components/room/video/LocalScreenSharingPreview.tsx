import { useEffect, useRef } from 'react';

type LocalScreenSharingPreviewProps = {
	stream: MediaStream;
};

export default function LocalScreenSharingPreview({ stream }: LocalScreenSharingPreviewProps) {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const videoElement = videoRef.current;

		if (videoElement) {
			videoElement.muted = true;
			videoElement.autoplay = true;
			videoElement.playsInline = true;
			videoElement.srcObject = stream;
			videoElement.onloadedmetadata = () => {
				videoElement.play();
			};
		}
	}, [stream]);

	return (
		<div className="local_screen_share_preview">
			<video ref={videoRef} />
		</div>
	);
}
