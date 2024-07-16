import { Suspense } from 'react';
import { RouterProvider, createBrowserRouter, type RouteObject } from 'react-router-dom';

import AppLayout from './components/layouts/AppLayout';
import * as P from './pages';

export enum RouterPath {
	ROOT = `/`,
	HOME = `/`,
	LOUNGE = `/lounge`,
	ROOM = `/room`,
	WAIT = `/wait`
}

const appObject: RouteObject[] = [
	{
		path: RouterPath.HOME,
		element: <P.Home />
	},
	{
		path: RouterPath.LOUNGE,
		element: <P.Lounge />
	},
	{
		path: RouterPath.ROOM,
		element: <P.Room />
	},
	{
		path: RouterPath.WAIT,
		element: <P.Wait />
	}
];

const routeObject: RouteObject[] = [
	{
		path: RouterPath.ROOT,
		element: <AppLayout />,
		children: appObject,
		errorElement: <div>Error.</div>
	}
];

export default function Router() {
	return (
		<Suspense fallback={<span>loading...</span>}>
			<RouterProvider router={createBrowserRouter(routeObject)} />
		</Suspense>
	);
}
