import type { DevtoolsStateCreator } from '../common/types';

enum FishActions {
	ADD_FISH = 'fish/addFish',
	RESET_FISH = 'fish/resetFish'
}

interface FishState {
	fishes: number;
}

const intialState: FishState = {
	fishes: 0
};

export interface FishSlice extends FishState {
	addFish: () => void;
	resetFish: () => void;
}

export const createFishSlice: DevtoolsStateCreator<FishSlice> = set => ({
	...intialState,
	addFish: () => set(state => ({ fishes: state.fishes + 1 }), false, FishActions.ADD_FISH),
	resetFish: () => set(intialState, false, FishActions.RESET_FISH)
});
