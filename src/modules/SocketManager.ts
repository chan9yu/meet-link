import type { SignalData } from 'simple-peer';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

import store from '../store';
import { setParticipants, setRoomId } from '../store/actions';
import { rtcManager } from './RTCManager';

const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:8080';

class SocketManager {
	public static instance: SocketManager;

	private socket: Socket;

	private constructor() {
		this.initilize();
	}

	private initilize() {
		console.log('SocketManager create instance');
		this.socket = io(SERVER_URL, { transports: ['websocket'] });
		this.initSocketEvents();
	}

	private initSocketEvents() {
		this.socket.on('connect', () => {
			const data = { socketId: this.socket.id };
			console.log(`<<< successfully connected with socket io server: ${JSON.stringify(data, null, 2)}`);
		});

		this.socket.on('room_id', data => {
			console.log(`<<< recv room_id: ${JSON.stringify(data, null, 2)}`);
			const { roomId } = data;
			store.dispatch(setRoomId(roomId));
		});

		this.socket.on('room_update', data => {
			console.log(`<<< recv room_update: ${JSON.stringify(data, null, 2)}`);
			const { connectedUsers } = data;
			store.dispatch(setParticipants(connectedUsers));
		});

		this.socket.on('connection_prepare', data => {
			console.log(`<<< recv connection_prepare: ${JSON.stringify(data, null, 2)}`);
			const { socketId } = data;
			rtcManager.prepareNewPeerConnection(socketId, false);
			this.sendConnectionInit(socketId);
		});

		this.socket.on('connection_signal', data => {
			console.log(`<<< recv connection_signal: ${JSON.stringify(data, null, 2)}`);
			const { signal, socketId } = data;
			rtcManager.handleSignalingData(signal, socketId);
		});

		this.socket.on('connection_init', data => {
			console.log(`<<< recv connection_init: ${JSON.stringify(data, null, 2)}`);
			const { socketId } = data;
			rtcManager.prepareNewPeerConnection(socketId, true);
		});

		this.socket.on('user_disconnected', data => {
			console.log(`<<< recv user_disconnected: ${JSON.stringify(data, null, 2)}`);
			const { socketId } = data;
			rtcManager.removePeerConnection(socketId);
		});
	}

	public static getInstance() {
		if (!SocketManager.instance) {
			SocketManager.instance = new SocketManager();
		}

		return SocketManager.instance;
	}

	public createRoom(identity: string) {
		const data = { identity };
		console.log(`>>> send create_room: ${JSON.stringify(data, null, 2)}`);
		this.socket.emit('create_room', data);
	}

	public joinRoom(identity: string, roomId: string) {
		const data = { identity, roomId };
		console.log(`>>> send join_room: ${JSON.stringify(data, null, 2)}`);
		this.socket.emit('join_room', data);
	}

	public signalPeerData(signal: SignalData, socketId: string) {
		const data = { signal, socketId };
		console.log(`>>> send connection_signal: ${JSON.stringify(data, null, 2)}`);
		this.socket.emit('connection_signal', data);
	}

	public sendConnectionInit(socketId: string) {
		const data = { socketId };
		console.log(`>>> send connection_init: ${JSON.stringify(data, null, 2)}`);
		this.socket.emit('connection_init', data);
	}
}

export const socketManager = SocketManager.getInstance();
