import { Link, Outlet } from 'react-router-dom';

import { RouterPath } from '../../../Router';
import * as styles from './AppLayout.css';

export default function AppLayout() {
	return (
		<div>
			<header className={styles.header}>
				<Link to={RouterPath.HOME}>HOME</Link>
				<Link to={RouterPath.LOUNGE}>LOUNGE</Link>
				<Link to={RouterPath.ROOM}>ROOM</Link>
				<Link to={RouterPath.WAIT}>WAIT</Link>
			</header>
			<Outlet />
		</div>
	);
}
