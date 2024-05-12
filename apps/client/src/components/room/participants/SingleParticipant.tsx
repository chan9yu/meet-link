type SingleParticipantProps = {
	lastItem: boolean;
	participant: { identity: string; socketId: string };
	socketId: string;
};

export default function SingleParticipant({ lastItem, participant, socketId }: SingleParticipantProps) {
	const handleOpenActiveChatbox = () => {
		if (participant.socketId !== socketId) {
			console.log('### handleOpenActiveChatbox');
		}
	};

	return (
		<>
			<p className="participants_paragraph" onClick={handleOpenActiveChatbox}>
				{participant.identity}
			</p>
			{!lastItem && <span className="participants_separator_line" />}
		</>
	);
}
