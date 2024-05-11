import { Logger } from '@nestjs/common';
import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

const API_PREFIX = 'api' as const;
const PORT = process.env.PORT || 8080;

const corsOptions: CorsOptions = {
	origin: true,
	credentials: true,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	preflightContinue: false,
	optionsSuccessStatus: 204
};

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.enableCors(corsOptions);
	app.setGlobalPrefix(API_PREFIX);

	await app.listen(PORT);
	Logger.log(`🚀 에플리케이션을 시작합니다 http://localhost:${PORT}/${API_PREFIX}`);
}

bootstrap();
