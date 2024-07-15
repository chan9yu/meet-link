import { Suspense } from 'react';
import { Navigate, RouterProvider, createBrowserRouter, type RouteObject } from 'react-router-dom';

import { AppLayout } from './components/layouts';
import * as P from './pages';

export enum RouterPath {
	ROOT = '/',
	WAIT = `/`,
	VIEWER = `/viewer`
}

const appObject: RouteObject[] = [
	{
		path: RouterPath.WAIT,
		element: <P.Wait />
	},
	{
		path: RouterPath.VIEWER,
		element: <P.Viewer />
	}
];

const routeObject: RouteObject[] = [
	{
		path: RouterPath.ROOT,
		element: <AppLayout />,
		children: appObject,
		errorElement: <Navigate to={RouterPath.ROOT} />
	}
];

export default function Router() {
	return (
		<Suspense fallback={<span>loading...</span>}>
			<RouterProvider router={createBrowserRouter(routeObject)} />
		</Suspense>
	);
}
