type ErrorMessageProps = {
	errorMessage: string | null;
};

export default function ErrorMessage({ errorMessage }: ErrorMessageProps) {
	return (
		<div className="error_message_container">
			{errorMessage && <p className="error_message_paragraph">{errorMessage}</p>}
		</div>
	);
}
