import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getHello(): string {
		return `Hello, we're WebRTC Advanced server`;
	}
}
