import { Message, User } from './reducer';

export const actions = {
	SET_ACTIVE_CONVERSATION: 'SET_ACTIVE_CONVERSATION',
	SET_CONNECT_ONLY_WITH_AUDIO: 'SET_CONNECT_ONLY_WITH_AUDIO',
	SET_DIRECT_CHAT_HISTORY: 'SET_DIRECT_CHAT_HISTORY',
	SET_IDENTITY: 'SET_IDENTITY',
	SET_IS_ROOM_HOST: 'SET_IS_ROOM_HOST',
	SET_MESSAGES: 'SET_MESSAGES',
	SET_PARTICIPANTS: 'SET_PARTICIPANTS',
	SET_ROOM_ID: 'SET_ROOM_ID',
	SET_SHOW_OVERLAY: 'SET_SHOW_OVERLAY',
	SET_SOCKET_ID: 'SET_SOCKET_ID'
} as const;

export const setActiveConversation = (activeConversation: string) => ({
	type: actions.SET_ACTIVE_CONVERSATION,
	data: activeConversation
});

export const setConnectOnlyWithAudio = (onlyWithAudio: boolean) => ({
	type: actions.SET_CONNECT_ONLY_WITH_AUDIO,
	data: onlyWithAudio
});

export const setDirectChatHistory = (directChatHistory: string) => ({
	type: actions.SET_DIRECT_CHAT_HISTORY,
	data: directChatHistory
});

export const setIdentity = (identity: string) => ({
	type: actions.SET_IDENTITY,
	data: identity
});

export const setIsRoomHost = (isRoomHost: boolean) => ({
	type: actions.SET_IS_ROOM_HOST,
	data: isRoomHost
});

export const setMessages = (messages: Message[]) => ({
	type: actions.SET_MESSAGES,
	data: messages
});

export const setParticipants = (participants: User[]) => ({
	type: actions.SET_PARTICIPANTS,
	data: participants
});

export const setRoomId = (roomId: string) => ({
	type: actions.SET_ROOM_ID,
	data: roomId
});

export const setShowOverlay = (showOverlay: boolean) => ({
	type: actions.SET_SHOW_OVERLAY,
	data: showOverlay
});

export const setSocketId = (socketId: string) => ({
	type: actions.SET_SOCKET_ID,
	data: socketId
});

export type ActionType =
	| ReturnType<typeof setActiveConversation>
	| ReturnType<typeof setConnectOnlyWithAudio>
	| ReturnType<typeof setDirectChatHistory>
	| ReturnType<typeof setIdentity>
	| ReturnType<typeof setIsRoomHost>
	| ReturnType<typeof setMessages>
	| ReturnType<typeof setParticipants>
	| ReturnType<typeof setRoomId>
	| ReturnType<typeof setShowOverlay>
	| ReturnType<typeof setSocketId>;
