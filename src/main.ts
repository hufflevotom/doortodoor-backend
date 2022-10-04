import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateDocumentacion } from './documentacion';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: false,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	app.enableCors();

	//* Genera la documentacion
	generateDocumentacion(app);

	await app.listen(process.env.PORT, () => {
		console.log(`Server running on port ${process.env.PORT}`);
		console.log(`Modo ${process.env.TIPO}`);
	});
}
bootstrap();
