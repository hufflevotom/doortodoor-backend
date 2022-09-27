import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './modules/auth/auth.module';

export function generateDocumentacion(app) {
	/** Genera una documentacion para el modulo de usuarios */
	const configAuth = new DocumentBuilder()
		.setTitle('Autenticación')
		.setDescription('Modulo de autenticación')
		.setVersion(process.env.APP_VERSION)
		.addBearerAuth()
		.build();
	const configAuthGeneral = SwaggerModule.createDocument(app, configAuth, {
		include: [AuthModule],
	});
	SwaggerModule.setup('docs/auth', app, configAuthGeneral);
}
