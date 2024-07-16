import type { StoreApi, UseBoundStore } from 'zustand';

type State = object;
type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<State>>>(_store: S) => {
	const store = _store as WithSelectors<typeof _store>;
	store.use = {};
	for (const k of Object.keys(store.getState())) {
		(store.use as { [key: string]: () => never })[k] = () => store(s => s[k as keyof typeof s]);
	}

	return store;
};
