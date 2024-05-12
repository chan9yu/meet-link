import { useSelector } from 'react-redux';

import { RootState } from '../../../store';
import SingleParticipant from './SingleParticipant';

export default function Participants() {
	const participants = useSelector((state: RootState) => state.participants);

	return (
		<div className="participants_container" style={{ width: '100%' }}>
			{participants.map((participant, index) => (
				<SingleParticipant
					key={participant.identity}
					lastItem={participants.length === index + 1}
					participant={participant}
					socketId="1"
				/>
			))}
		</div>
	);
}
