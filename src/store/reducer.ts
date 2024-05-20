import { produce } from 'immer';
import { ActionType, actions } from './actions';

export type User = {
	id: string;
	identity: string;
	roomId: string;
	socketId: string;
};

export type Message = {
	content: string;
	identity: string;
	messageCreatedByMe: boolean;
};

type InitialState = {
	identity: string;
	isRoomHost: boolean;
	connectOnlyWithAudio: boolean;
	roomId: string | null;
	showOverlay: boolean;
	participants: User[];
	messages: Message[];
	activeConversation: null;
	directChatHistory: string[];
	socketId: string | null;
};

const initialState: InitialState = {
	activeConversation: null,
	connectOnlyWithAudio: false,
	directChatHistory: [],
	identity: '',
	isRoomHost: false,
	messages: [],
	participants: [],
	roomId: null,
	showOverlay: true,
	socketId: null
};

export default function reducer(state = initialState, action: ActionType) {
	return produce(state, draft => {
		switch (action.type) {
			case actions.SET_ACTIVE_CONVERSATION:
				break;
			case actions.SET_CONNECT_ONLY_WITH_AUDIO:
				draft.connectOnlyWithAudio = action.data;
				break;
			case actions.SET_DIRECT_CHAT_HISTORY:
				break;
			case actions.SET_IDENTITY:
				draft.identity = action.data;
				break;
			case actions.SET_IS_ROOM_HOST:
				draft.isRoomHost = action.data;
				break;
			case actions.SET_MESSAGES:
				draft.messages = action.data;
				break;
			case actions.SET_PARTICIPANTS:
				draft.participants = action.data;
				break;
			case actions.SET_ROOM_ID:
				draft.roomId = action.data;
				break;
			case actions.SET_SHOW_OVERLAY:
				draft.showOverlay = action.data;
				break;
			case actions.SET_SOCKET_ID:
				break;
			default:
				break;
		}
	});
}
