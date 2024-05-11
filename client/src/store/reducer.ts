import { UnknownAction } from 'redux';

const initState = {
	identity: ''
};

const reducer = (state = initState, action: UnknownAction) => {
	switch (action.type) {
		case 'DUMMY_ACTION':
			return {
				...state
			};
		default:
			return state;
	}
};

export default reducer;
