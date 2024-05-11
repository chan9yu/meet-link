import { ComponentProps } from 'react';

type JoinButtonProps = {
	cancelButton?: boolean;
} & ComponentProps<'button'>;

export default function JoinRoomButton({ cancelButton = false, children, ...rest }: JoinButtonProps) {
	const buttonClass = cancelButton ? 'join_room_cancel_button' : 'join_room_success_button';

	return (
		<button className={buttonClass} {...rest}>
			{children}
		</button>
	);
}
