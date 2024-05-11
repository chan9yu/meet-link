import { Navigate, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { RouterPath } from './constants/router';
import AppLayout from './layouts/AppLayout';
import * as P from './pages';

const appObject: RouteObject[] = [
	{
		path: RouterPath.INTRODUCTION,
		element: <P.Introduction />
	},
	{
		path: RouterPath.JOIN_ROOM,
		element: <P.JoinRoom />
	},
	{
		path: RouterPath.ROOM,
		element: <P.Room />
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
	return <RouterProvider router={createBrowserRouter(routeObject)} />;
}
