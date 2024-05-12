import { Injectable } from '@nestjs/common';
import type { CreateRoomMessage, JoinRoomMessage, RoomExistsResponse, User } from '@webrtc-advanced/types';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

type Room = {
	id: string;
	connectedUsers: User[];
};

@Injectable()
export class AppService {
	private rooms: Room[] = [];
	private connectedUsers: User[] = [];

	private findRoomById(roomId: string) {
		return this.rooms.find(room => room.id === roomId);
	}

	private isRoomFull(room: Room) {
		return room.connectedUsers.length > 3;
	}

	public getHello(): string {
		return `Hello, we're WebRTC Advanced server`;
	}

	public getRoomInfo(roomId: string) {
		let roomInfo: RoomExistsResponse = { exists: false };
		const room = this.findRoomById(roomId);

		if (room) {
			const isFull = this.isRoomFull(room);
			roomInfo = { exists: true, full: isFull };
		}

		return roomInfo;
	}

	public createRoom(data: CreateRoomMessage, socketId: string) {
		const { identity } = data;
		const roomId = uuidv4();

		const newUser: User = {
			id: uuidv4(),
			identity,
			roomId,
			socketId
		};

		const newRoom: Room = {
			id: roomId,
			connectedUsers: [newUser]
		};

		this.connectedUsers = [...this.connectedUsers, newUser];
		this.rooms = [...this.rooms, newRoom];

		return {
			connectedUsers: newRoom.connectedUsers,
			roomId
		};
	}

	public joinRoom(data: JoinRoomMessage, socketId: string) {
		const { identity, roomId } = data;

		const newUser: User = {
			id: uuidv4(),
			identity,
			roomId,
			socketId
		};

		const room = this.rooms.find(room => room.id === roomId) as Room;
		room.connectedUsers = [...room.connectedUsers, newUser];
		this.connectedUsers = [...this.connectedUsers, newUser];

		return {
			connectedUsers: room.connectedUsers
		};
	}

	public disconnect(socket: Socket) {
		const user = this.connectedUsers.find(user => user.socketId === socket.id);

		if (user) {
			const room = this.rooms.find(room => room.id === user.roomId) as Room;
			room.connectedUsers = room.connectedUsers.filter(user => user.socketId !== socket.id);
			socket.leave(user.roomId);

			if (room.connectedUsers.length > 0) {
				socket.to(room.id).emit('user_disconnected', { socketId: socket.id });
				socket.to(room.id).emit('room_update', { connectedUsers: room.connectedUsers });
			} else {
				this.rooms = this.rooms.filter(r => r.id !== room.id);
			}
		}
	}
}
