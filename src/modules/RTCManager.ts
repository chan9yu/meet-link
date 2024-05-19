import type { Instance as PeerInstance, SignalData } from 'simple-peer';
import Peer from 'simple-peer';

import store from '../store';
import { setShowOverlay } from '../store/actions';
import { socketManager } from './SocketManager';

type SimplePeers = {
	[key: string]: PeerInstance;
};

const DEFAULT_CONSTRAINTS: MediaStreamConstraints = {
	audio: true,
	video: {
		width: 480,
		height: 360
	}
};

class RTCManager {
	public static instance: RTCManager;

	private localStream: MediaStream;
	private streams: MediaStream[] = [];
	private peers: SimplePeers = {};

	private constructor() {
		console.log('RTCManager create instance');
	}

	public static getInstance() {
		if (!RTCManager.instance) {
			RTCManager.instance = new RTCManager();
		}

		return RTCManager.instance;
	}

	private getConfiguration(): RTCConfiguration {
		const iceServers: RTCIceServer[] = [
			{
				urls: 'stun:stun.l.google.com:19302'
			}
		];

		return {
			iceServers
		};
	}

	private showLocalVideoPreview(stream: MediaStream) {
		// show local video preview
		const videosContainer = document.getElementById('videos_portal');
		videosContainer?.classList.add('videos_portal_styles');

		const videoContainer = document.createElement('div');
		videoContainer.classList.add('video_track_container');

		const videoElement = document.createElement('video');
		videoElement.autoplay = true;
		videoElement.muted = true;
		videoElement.playsInline = true;
		videoElement.srcObject = stream;
		videoElement.onloadedmetadata = () => {
			videoElement.play();
		};

		videoContainer.appendChild(videoElement);
		videosContainer?.appendChild(videoContainer);
	}

	private addSteram(stream: MediaStream, socketId: string) {
		// display incoming stream
		const videosContainer = document.getElementById('videos_portal');

		const videoContainer = document.createElement('div');
		videoContainer.id = socketId;
		videoContainer.classList.add('video_track_container');

		const videoElement = document.createElement('video');
		videoElement.id = `${socketId}-video`;
		videoElement.autoplay = true;
		videoElement.playsInline = true;
		videoElement.srcObject = stream;

		videoElement.onloadedmetadata = () => {
			videoElement.play();
		};

		videoElement.onclick = () => {
			if (videoElement.classList.contains('full_screen')) {
				videoElement.classList.remove('full_screen');
			} else {
				videoElement.classList.add('full_screen');
			}
		};

		videoContainer.appendChild(videoElement);
		videosContainer?.appendChild(videoContainer);
	}

	public async getLocalPreviewAndInitRoomConnection(
		identity: string,
		isRoomHost: boolean,
		roomId: string | null = null
	) {
		try {
			const stream = await navigator.mediaDevices.getUserMedia(DEFAULT_CONSTRAINTS);
			console.log('successfuly received local stream');
			this.localStream = stream;
			this.showLocalVideoPreview(stream);
			store.dispatch(setShowOverlay(false));
			isRoomHost ? socketManager.createRoom(identity) : socketManager.joinRoom(identity, roomId as string);
		} catch (error) {
			console.error('error doccurred when trying to get an access to local stream');
			console.error(error);
		}
	}

	public prepareNewPeerConnection(socketId: string, isInitiator: boolean) {
		const configuration = this.getConfiguration();

		this.peers[socketId] = new Peer({
			initiator: isInitiator,
			config: configuration,
			stream: this.localStream
		});

		this.peers[socketId].on('signal', signal => {
			socketManager.signalPeerData(signal, socketId);
		});

		this.peers[socketId].on('stream', stream => {
			console.log('new stream came');
			this.addSteram(stream, socketId);
			this.streams = [...this.streams, stream];
		});
	}

	public handleSignalingData(signal: SignalData, socketId: string) {
		this.peers[socketId].signal(signal);
	}

	public removePeerConnection(socketId: string) {
		const videoContainer = document.getElementById(socketId) as HTMLDivElement | null;
		const videoElement = document.getElementById(`${socketId}-video`) as HTMLVideoElement | null;

		if (videoContainer && videoElement) {
			const stream = videoElement.srcObject as MediaStream;
			const tracks = stream.getTracks();
			tracks.forEach(track => track.stop());

			videoElement.srcObject = null;
			videoContainer.removeChild(videoElement);
			videoContainer.parentNode && videoContainer.parentNode.removeChild(videoContainer);

			this.peers[socketId] && this.peers[socketId].destroy();
			delete this.peers[socketId];
		}
	}
}

export const rtcManager = RTCManager.getInstance();
