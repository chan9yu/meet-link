import { useSelector } from 'react-redux';

import { RootState } from '../../../store';
import Message from './Message';

export default function Messages() {
	const messages = useSelector((state: RootState) => state.messages);

	return (
		<div className="messages_container">
			{messages.map(({ content, identity, messageCreatedByMe }, index) => (
				<Message
					key={`${content}${index}`}
					author={identity}
					content={content}
					messageCreatedByMe={messageCreatedByMe}
					sameAuthor={index > 0 && identity === messages[index - 1].identity}
				/>
			))}
		</div>
	);
}
