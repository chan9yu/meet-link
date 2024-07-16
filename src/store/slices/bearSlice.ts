import type { DevtoolsStateCreator } from '../common/types';
import type { FishSlice } from './fishSlice';

enum BearActions {
	ADD_BEAR = 'bear/addBear',
	RESET_BEAR = 'bear/resetBear',
	EAT_FISH = 'bear/eatFish'
}

interface BearState {
	bears: number;
}

const intialState: BearState = {
	bears: 0
};

export interface BearSlice extends BearState {
	addBear: () => void;
	resetBear: () => void;
	eatFish: () => void;
}

export const createBearSlice: DevtoolsStateCreator<BearSlice & FishSlice, BearSlice> = set => ({
	...intialState,
	addBear: () => set(state => ({ bears: state.bears + 1 }), false, BearActions.ADD_BEAR),
	resetBear: () => set(intialState, false, BearActions.RESET_BEAR),
	eatFish: () => set(state => ({ fishes: state.fishes - 1 }), false, BearActions.EAT_FISH)
});
