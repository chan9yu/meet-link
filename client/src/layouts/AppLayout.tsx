import { Outlet, useNavigate } from 'react-router-dom';

export default function AppLayout() {
	const navigate = useNavigate();

	return <Outlet />;
}
