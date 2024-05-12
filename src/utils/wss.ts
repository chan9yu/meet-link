import { io, type Socket } from 'socket.io-client';

import store from '../store';
import { setParticipants, setRoomId } from '../store/actions';

const URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:8080';

let socket: Socket;

export function connectWithSocketIOServer() {
	socket = io(URL, { transports: ['websocket'] });

	socket.on('connect', () => {
		const data = { socketId: socket.id };
		console.log(`<<< successfully connected with socket io server: ${JSON.stringify(data, null, 2)}`);
	});

	socket.on('room_id', data => {
		console.log(`<<< recv room_id: ${JSON.stringify(data, null, 2)}`);
		const { roomId } = data;
		store.dispatch(setRoomId(roomId));
	});

	socket.on('room_update', data => {
		console.log(`<<< recv room_update: ${JSON.stringify(data, null, 2)}`);
		const { connectedUsers } = data;
		store.dispatch(setParticipants(connectedUsers));
	});
}

export function createRoom(identity: string) {
	const data = { identity };
	console.log(`>>> send create_room: ${JSON.stringify(data, null, 2)}`);
	socket.emit('create_room', data);
}

export function joinRoom(identity: string, roomId: string) {
	const data = { identity, roomId };
	console.log(`>>> send join_room: ${JSON.stringify(data, null, 2)}`);
	socket.emit('join_room', data);
}
