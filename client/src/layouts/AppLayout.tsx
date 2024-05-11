import { Outlet, useNavigate } from 'react-router-dom';
import { RouterPath } from '../constants/router';

export default function AppLayout() {
	const navigate = useNavigate();

	return (
		<div>
			<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
				<div onClick={() => navigate(RouterPath.INTRODUCTION)}>introduction</div>
				<div onClick={() => navigate(RouterPath.JOIN_ROOM)}>join_room</div>
				<div onClick={() => navigate(RouterPath.ROOM)}>room</div>
			</div>
			<br />
			<br />
			<Outlet />
		</div>
	);
}
