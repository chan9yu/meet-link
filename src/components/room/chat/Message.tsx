type MessageProps = {
	author: string;
	content: string;
	messageCreatedByMe: boolean;
	sameAuthor: boolean;
};

export default function Message({ author, content, messageCreatedByMe, sameAuthor }: MessageProps) {
	const alignClass = `message_container ${messageCreatedByMe ? 'message_align_right' : 'message_align_left'}`;
	const contentAdditionalClass = `message_content ${messageCreatedByMe ? 'message_right_styles' : 'message_left_styles'}`;

	return (
		<div className={alignClass}>
			{!sameAuthor && <p className="message_title">{messageCreatedByMe ? 'You' : author}</p>}
			<p className={contentAdditionalClass}>{content}</p>
		</div>
	);
}
