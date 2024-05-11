import { useDispatch, useSelector } from 'react-redux';

import check_img from '../../assets/images/check.png';
import { RootState } from '../../store';
import { setConnectOnlyWithAudio } from '../../store/actions';

export default function OnlyWithAudioCheckbox() {
	const dispatch = useDispatch();
	const connectOnlyWithAudio = useSelector((state: RootState) => state.connectOnlyWithAudio);

	const handleToogleConnectionType = () => {
		dispatch(setConnectOnlyWithAudio(!connectOnlyWithAudio));
	};

	return (
		<div className="checkbox_container">
			<div className="checkbox_connection" onClick={handleToogleConnectionType}>
				{connectOnlyWithAudio && <img src={check_img} alt="checkbox_image" className="checkbox_image" />}
			</div>
			<p className="checkbox_container_paragraph">Only audio</p>
		</div>
	);
}
