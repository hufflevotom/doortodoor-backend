import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './modules/auth/auth.module';
import { DocumentModule } from './modules/document/document.module';
import { TransportModule } from './modules/transport/transport.module';

export function generateDocumentacion(app) {
	//* Genera una documentacion para el modulo de usuarios
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

	//* Genera una documentacion para el modulo de transportes
	const configTransport = new DocumentBuilder()
		.setTitle('Transportes')
		.setDescription('Modulo de transportes')
		.setVersion(process.env.APP_VERSION)
		.addBearerAuth()
		.build();
	const configTransportGeneral = SwaggerModule.createDocument(app, configTransport, {
		include: [TransportModule],
	});
	SwaggerModule.setup('docs/transport', app, configTransportGeneral);

	//* Genera una documentacion para el modulo de documentos
	const configDocument = new DocumentBuilder()
		.setTitle('Documentos')
		.setDescription('Modulo de documentos')
		.setVersion(process.env.APP_VERSION)
		.addBearerAuth()
		.build();
	const configDocumentGeneral = SwaggerModule.createDocument(app, configDocument, {
		include: [DocumentModule],
	});
	SwaggerModule.setup('docs/document', app, configDocumentGeneral);
}
