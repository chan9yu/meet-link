import type { DevtoolsStateCreator } from '../common/types';
import type { BearSlice } from './bearSlice';
import type { FishSlice } from './fishSlice';

export interface SharedSlice {
	addBoth: () => void;
	getBoth: () => number;
	resetBoth: () => void;
}

export const createSharedSlice: DevtoolsStateCreator<BearSlice & FishSlice, SharedSlice> = (set, get) => ({
	addBoth: () => {
		get().addBear();
		get().addFish();
	},
	getBoth: () => get().bears + get().fishes,
	resetBoth: () => {
		get().resetBear();
		get().resetFish();
	}
});
