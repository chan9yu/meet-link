import { StateCreator } from 'zustand';

export type DevtoolsStateCreator<T, K = T> = StateCreator<T, [['zustand/devtools', never]], [], K>;
