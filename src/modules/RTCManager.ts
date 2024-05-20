import type { Instance as PeerInstance, SignalData } from 'simple-peer';
import Peer from 'simple-peer';

import store from '../store';
import { setMessages, setShowOverlay } from '../store/actions';
import type { Message } from '../store/reducer';
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

	private switchVideoTracks(stream: MediaStream) {
		stream.getTracks().forEach(newTrack => {
			for (const socketId in this.peers) {
				const peerStream = this.peers[socketId].streams[0];
				const peerTracks = peerStream.getTracks();
				const matchingTrack = peerTracks.find(peerTrack => peerTrack.kind === newTrack.kind);
				matchingTrack && this.peers[socketId].replaceTrack(matchingTrack, newTrack, peerStream);
			}
		});
	}

	private appendNewMessage(messageData: Message) {
		const message = store.getState().messages;
		store.dispatch(setMessages([...message, messageData]));
	}

	public async getLocalPreviewAndInitRoomConnection(
		identity: string,
		isRoomHost: boolean,
		roomId: string | null = null
	) {
		try {
			const stream = await navigator.mediaDevices.getUserMedia(DEFAULT_CONSTRAINTS);
			console.log('successfully received local stream');
			this.localStream = stream;
			this.showLocalVideoPreview(stream);
			store.dispatch(setShowOverlay(false));
			isRoomHost ? socketManager.sendCreateRoom(identity) : socketManager.sendJoinRoom(identity, roomId as string);
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
			stream: this.localStream,
			channelName: 'messenger'
		});

		this.peers[socketId].on('signal', signal => {
			socketManager.sendConnectionSignal(signal, socketId);
		});

		this.peers[socketId].on('stream', stream => {
			console.log('new stream came');
			this.addSteram(stream, socketId);
			this.streams = [...this.streams, stream];
		});

		this.peers[socketId].on('data', data => {
			const messageData = JSON.parse(data);
			this.appendNewMessage(messageData);
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

	public toggleAudio(enabled: boolean) {
		this.localStream.getAudioTracks()[0].enabled = enabled;
	}

	public toggleVideo(enabled: boolean) {
		this.localStream.getVideoTracks()[0].enabled = enabled;
	}

	public toggleScreenShare(isScreenSharingActive: boolean, screenSharingStream: MediaStream | null = null) {
		if (isScreenSharingActive) {
			this.switchVideoTracks(this.localStream);
		} else {
			screenSharingStream && this.switchVideoTracks(screenSharingStream);
		}
	}

	public sendMessageUsingDataChannel(messageContent: string) {
		const identity = store.getState().identity;

		const localMessageData: Message = {
			content: messageContent,
			identity,
			messageCreatedByMe: true
		};

		this.appendNewMessage(localMessageData);

		const messageData: Message = {
			content: messageContent,
			identity,
			messageCreatedByMe: false
		};

		for (const socketId in this.peers) {
			this.peers[socketId].send(JSON.stringify(messageData));
		}
	}
}

export const rtcManager = RTCManager.getInstance();
