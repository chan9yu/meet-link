import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createSelectors } from './selectors';
import { BearSlice, createBearSlice } from './slices/bearSlice';
import { FishSlice, createFishSlice } from './slices/fishSlice';
import { SharedSlice, createSharedSlice } from './slices/sharedSlice';

type Slice = BearSlice & FishSlice & SharedSlice;

const createStore = () =>
	create<Slice>()(
		devtools(
			(...a) => ({
				...createBearSlice(...a),
				...createFishSlice(...a),
				...createSharedSlice(...a)
			}),
			{ name: 'meet-link_store', enabled: !!import.meta.env.DEV }
		)
	);

export const useStore = createSelectors(createStore());
