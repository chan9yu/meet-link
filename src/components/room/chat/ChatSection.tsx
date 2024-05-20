import ChatLabel from './ChatLabel';
import Messages from './Messages';
import NewMessage from './NewMessage';

export default function ChatSection() {
	return (
		<div className="chat_section_container">
			<ChatLabel />
			<Messages />
			<NewMessage />
		</div>
	);
}
