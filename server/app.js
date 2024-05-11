import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors';
import twilio from 'twilio';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 5002;

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST']
	}
});

app.use(cors());

server.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`);
});
