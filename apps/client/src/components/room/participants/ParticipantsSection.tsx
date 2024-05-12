import DirectChat from './DirectChat';
import Participants from './Participants';
import ParticipantsLabel from './ParticipantsLabel';

export default function ParticipantsSection() {
	return (
		<div className="participants_container">
			<ParticipantsLabel />
			<Participants />
			<DirectChat />
		</div>
	);
}
