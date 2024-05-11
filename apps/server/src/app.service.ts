import { Injectable } from '@nestjs/common';
import type { RoomExistsResponse } from '@webrtc-advanced/types';

type Rooms = {
	id: string;
	connectedUsers: string[];
};

@Injectable()
export class AppService {
	private rooms: Rooms[] = [];

	private findRoomById(roomId: string) {
		return this.rooms.find(room => room.id === roomId);
	}

	private isRoomFull(room: Rooms) {
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
}
