import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import Router from './Router';
import store from './store';
import './styles/index.css';

const queryClient = new QueryClient();

const ReactQueryDevtoolsProduction = lazy(() =>
	import('@tanstack/react-query-devtools/build/modern/production.js').then(d => ({
		default: d.ReactQueryDevtools
	}))
);

export default function App() {
	const [showDevtools, setShowDevtools] = useState(false);

	useEffect(() => {
		window.toggleDevtools = () => setShowDevtools(old => !old);
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<Router />
			</Provider>
			<ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
			{showDevtools && (
				<Suspense fallback={null}>
					<ReactQueryDevtoolsProduction />
				</Suspense>
			)}
		</QueryClientProvider>
	);
}
