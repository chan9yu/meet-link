import type { SignalData } from 'simple-peer';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

import store from '../store';
import { setParticipants, setRoomId } from '../store/actions';
import { rtcManager } from './RTCManager';

enum SocketEvents {
	CONNECT = 'connect',
	CONNECTION_INIT = 'connection_init',
	CONNECTION_PREPARE = 'connection_prepare',
	CONNECTION_SIGNAL = 'connection_signal',
	CREATE_ROOM = 'create_room',
	JOIN_ROOM = 'join_room',
	ROOM_ID = 'room_id',
	ROOM_UPDATE = 'room_update',
	USER_DISCONNECTED = 'user_disconnected'
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:8080';

class SocketManager {
	public static instance: SocketManager;
	public static events = SocketEvents;

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
		this.socket.on(SocketManager.events.CONNECT, () => {
			const data = { socketId: this.socket.id };
			console.log(`successfully connected with socket io server: ${JSON.stringify(data, null, 2)}`);
		});

		this.socket.on(SocketManager.events.ROOM_ID, data => {
			console.log(`<<< recv ${SocketManager.events.ROOM_ID}: ${JSON.stringify(data, null, 2)}`);
			const { roomId } = data;
			store.dispatch(setRoomId(roomId));
		});

		this.socket.on(SocketManager.events.ROOM_UPDATE, data => {
			console.log(`<<< recv ${SocketEvents.ROOM_UPDATE}: ${JSON.stringify(data, null, 2)}`);
			const { connectedUsers } = data;
			store.dispatch(setParticipants(connectedUsers));
		});

		this.socket.on(SocketManager.events.CONNECTION_PREPARE, data => {
			console.log(`<<< recv ${SocketManager.events.CONNECTION_PREPARE}: ${JSON.stringify(data, null, 2)}`);
			const { socketId } = data;
			rtcManager.prepareNewPeerConnection(socketId, false);
			this.sendConnectionInit(socketId);
		});

		this.socket.on(SocketManager.events.CONNECTION_SIGNAL, data => {
			console.log(`<<< recv ${SocketManager.events.CONNECTION_SIGNAL}: ${JSON.stringify(data, null, 2)}`);
			const { signal, socketId } = data;
			rtcManager.handleSignalingData(signal, socketId);
		});

		this.socket.on(SocketManager.events.CONNECTION_INIT, data => {
			console.log(`<<< recv ${SocketManager.events.CONNECTION_INIT}: ${JSON.stringify(data, null, 2)}`);
			const { socketId } = data;
			rtcManager.prepareNewPeerConnection(socketId, true);
		});

		this.socket.on(SocketManager.events.USER_DISCONNECTED, data => {
			console.log(`<<< recv ${SocketManager.events.USER_DISCONNECTED}: ${JSON.stringify(data, null, 2)}`);
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

	public sendCreateRoom(identity: string) {
		const data = { identity };
		console.log(`>>> send ${SocketManager.events.CREATE_ROOM}: ${JSON.stringify(data, null, 2)}`);
		this.socket.emit(SocketManager.events.CREATE_ROOM, data);
	}

	public sendJoinRoom(identity: string, roomId: string) {
		const data = { identity, roomId };
		console.log(`>>> send ${SocketManager.events.JOIN_ROOM}: ${JSON.stringify(data, null, 2)}`);
		this.socket.emit(SocketManager.events.JOIN_ROOM, data);
	}

	public sendConnectionSignal(signal: SignalData, socketId: string) {
		const data = { signal, socketId };
		console.log(`>>> send ${SocketManager.events.CONNECTION_SIGNAL}: ${JSON.stringify(data, null, 2)}`);
		this.socket.emit(SocketManager.events.CONNECTION_SIGNAL, data);
	}

	public sendConnectionInit(socketId: string) {
		const data = { socketId };
		console.log(`>>> send ${SocketManager.events.CONNECTION_INIT}: ${JSON.stringify(data, null, 2)}`);
		this.socket.emit(SocketManager.events.CONNECTION_INIT, data);
	}
}

export const socketManager = SocketManager.getInstance();
