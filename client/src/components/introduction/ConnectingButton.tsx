import { ComponentProps } from 'react';

type ConnectingButtonProps = {
	createRoomButton?: boolean;
} & ComponentProps<'button'>;

export default function ConnectingButton({ createRoomButton = false, children, ...rest }: ConnectingButtonProps) {
	const buttonClass = `intro_button ${createRoomButton ? 'create_room_button' : 'join_room_button'}`;

	return (
		<button className={buttonClass} {...rest}>
			{children}
		</button>
	);
}
