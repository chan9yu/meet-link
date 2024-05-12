import type { User } from '@webrtc-advanced/types';
import { produce } from 'immer';

import { ActionType, actions } from './actions';

type InitialState = {
	connectOnlyWithAudio: boolean;
	identity: string;
	isRoomHost: boolean;
	participants: User[];
	roomId: string | null;
	showOverlay: boolean;
};

const initialState: InitialState = {
	connectOnlyWithAudio: false,
	identity: '',
	isRoomHost: false,
	participants: [],
	roomId: null,
	showOverlay: true
};

export default function reducer(state = initialState, action: ActionType) {
	return produce(state, draft => {
		switch (action.type) {
			case actions.SET_CONNECT_ONLY_WITH_AUDIO:
				draft.connectOnlyWithAudio = action.data;
				break;
			case actions.SET_IDENTITY:
				draft.identity = action.data;
				break;
			case actions.SET_IS_ROOM_HOST:
				draft.isRoomHost = action.data;
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
			default:
				break;
		}
	});
}
