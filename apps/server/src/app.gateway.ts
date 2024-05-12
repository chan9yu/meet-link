import { Logger } from '@nestjs/common';
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets';
import type { CreateRoomMessage, JoinRoomMessage } from '@webrtc-advanced/types';
import { Server, Socket } from 'socket.io';

import { AppService } from './app.service';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	private logger = new Logger('web_socket');

	@WebSocketServer()
	server: Server;

	constructor(private readonly appService: AppService) {
		this.logger.log('constructor');
	}

	afterInit() {
		this.logger.log('init');
	}

	handleDisconnect(@ConnectedSocket() socket: Socket) {
		this.logger.log(`disconnected: ${socket.id}`);
		this.appService.disconnect(socket);
	}

	handleConnection(@ConnectedSocket() socket: Socket) {
		this.logger.log(`connected: ${socket.id}`);
	}

	@SubscribeMessage('create_room')
	createRoom(@MessageBody() data: CreateRoomMessage, @ConnectedSocket() socket: Socket) {
		const { connectedUsers, roomId } = this.appService.createRoom(data, socket.id);
		socket.join(roomId);
		socket.emit('room_id', { roomId });
		socket.emit('room_update', { connectedUsers });
	}

	@SubscribeMessage('join_room')
	joinRoom(@MessageBody() data: JoinRoomMessage, @ConnectedSocket() socket: Socket) {
		const roomId = data.roomId;
		const { connectedUsers } = this.appService.joinRoom(data, socket.id);
		socket.join(roomId);
		this.server.to(roomId).emit('room_update', { connectedUsers });
	}
}
