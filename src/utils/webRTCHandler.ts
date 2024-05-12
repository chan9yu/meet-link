import store from '../store';
import { setShowOverlay } from '../store/actions';
import * as wss from './wss';

const DEFAULT_CONSTRAINTS = {
	audio: true,
	video: true
} as MediaStreamConstraints;

let localStream: MediaStream;

function showLocalVideoPreview(stream: MediaStream) {
	// show local video preview
}

export async function getLocalPreviewAndInitRoomConnection(
	identity: string,
	isRoomHost: boolean,
	roomId: string | null = null
) {
	try {
		const stream = await navigator.mediaDevices.getUserMedia(DEFAULT_CONSTRAINTS);
		console.log('successfuly received local stream');
		localStream = stream;
		showLocalVideoPreview(localStream);
		store.dispatch(setShowOverlay(false));
		isRoomHost ? wss.createRoom(identity) : wss.joinRoom(identity, roomId as string);
	} catch (error) {
		console.error('error doccurred when trying to get an access to local stream');
		console.error(error);
	}
}
