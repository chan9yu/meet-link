import { ChangeEvent, FormEvent, useState } from 'react';
import * as styles from './Home.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Meet Link</h2>
			<div className={styles.wrapper}>
				<Publisher />
				<Subscriber />
			</div>
		</div>
	);
}

const useHome = () => {
	const [roomId, setRoomId] = useState('');
	const [username, setusername] = useState('');

	const handleChangeRoomId = (e: ChangeEvent<HTMLInputElement>) => setRoomId(e.target.value);
	const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => setusername(e.target.value);

	return {
		roomId,
		username,
		handleChangeRoomId,
		handleChangeUsername
	};
};

function Publisher() {
	const { roomId, username, handleChangeRoomId, handleChangeUsername } = useHome();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		alert(`create room ${roomId}`);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<h3 className={styles.label}>publisher</h3>
			<input className={styles.input} value={roomId} onChange={handleChangeRoomId} placeholder="roomId" />
			<input className={styles.input} value={username} onChange={handleChangeUsername} placeholder="username" />
			<button type="submit" className={styles.button}>
				Create Room
			</button>
		</form>
	);
}

function Subscriber() {
	const { roomId, username, handleChangeRoomId, handleChangeUsername } = useHome();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		alert(`join room ${roomId}`);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<h3 className={styles.label}>subscriber</h3>
			<input className={styles.input} value={roomId} onChange={handleChangeRoomId} placeholder="roomId" />
			<input className={styles.input} value={username} onChange={handleChangeUsername} placeholder="username" />
			<button type="submit" className={styles.button}>
				Join Room
			</button>
		</form>
	);
}
