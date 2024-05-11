import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

export default configureStore({
	reducer
});

export type RootState = ReturnType<typeof reducer>;
