import { useEffect } from 'react';

import Router from './Router';
import { connectWithSocketIOServer } from './utils/wss';

export default function App() {
	useEffect(() => {
		connectWithSocketIOServer();
	}, []);

	return <Router />;
}
