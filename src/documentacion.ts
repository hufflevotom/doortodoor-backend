import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function generateDocumentacion(app) {
	/** Genera una documentacion para el modulo de usuarios */
	const configUsuario = new DocumentBuilder()
		.setTitle('Usuarios')
		.setDescription('Modulo Usuarios')
		.setVersion(process.env.APP_VERSION)
		.addBearerAuth()
		.build();
	const configUsuarioGeneral = SwaggerModule.createDocument(app, configUsuario, {
		//   include: [UsuarioModule],
	});
	SwaggerModule.setup('docs/usuario', app, configUsuarioGeneral);
}
