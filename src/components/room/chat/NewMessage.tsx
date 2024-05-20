import { ChangeEvent, KeyboardEvent, useState } from 'react';

import send_message_button_svg from '../../../assets/svgs/sendMessageButton.svg';
import { rtcManager } from '../../../modules/RTCManager';

export default function NewMessage() {
	const [message, setMessage] = useState('');

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setMessage(event.target.value);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleSendMessage();
		}
	};

	const handleSendMessage = () => {
		if (message.length > 0) {
			rtcManager.sendMessageUsingDataChannel(message);
			setMessage('');
		}
	};

	return (
		<div className="new_message_container">
			<input
				className="new_message_input"
				type="text"
				placeholder="Type your message ..."
				value={message}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
			<img
				src={send_message_button_svg}
				alt="send_message_button"
				className="new_message_button"
				onClick={handleSendMessage}
			/>
		</div>
	);
}
