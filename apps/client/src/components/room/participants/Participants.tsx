import SingleParticipant from './SingleParticipant';

const DUMMY_PARTICIPANTS = [
	{ identity: '옥분이', socketId: '1' },
	{ identity: '봉팍이', socketId: '2' },
	{ identity: '건식이', socketId: '3' },
	{ identity: '광식이', socketId: '4' }
];

export default function Participants() {
	return (
		<div className="participants_container" style={{ width: '100%' }}>
			{DUMMY_PARTICIPANTS.map((participant, index) => (
				<SingleParticipant
					key={participant.identity}
					lastItem={DUMMY_PARTICIPANTS.length === index + 1}
					participant={participant}
					socketId="1"
				/>
			))}
		</div>
	);
}
