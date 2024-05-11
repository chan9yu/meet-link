import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import logo from '../../assets/images/logo.png';
import ConnectingButtons from '../../components/introduction/ConnectingButtons';
import { setIsRoomHost } from '../../store/actions';
import './Introduction.css';

export default function Introduction() {
	const dispath = useDispatch();

	useEffect(() => {
		dispath(setIsRoomHost(false));
	}, []);

	return (
		<div className="introduction_page_container">
			<div className="introduction_page_panel">
				<img src={logo} className="introduction_page_image" />
				<ConnectingButtons />
			</div>
		</div>
	);
}
