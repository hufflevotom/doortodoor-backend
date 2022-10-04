import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import config, { validation } from './config/config';
import { environment } from './config/enviroments';
import { AuthModule } from './modules/auth/auth.module';
import { join } from 'path';
import { TransportModule } from './modules/transport/transport.module';
import { DocumentModule } from './modules/document/document.module';
@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath:
				process.env.TIPO === 'PROD' ? join(__dirname, 'public') : join(__dirname, '..', 'public'),
		}),
		ConfigModule.forRoot({
			// * Definimos que es global
			isGlobal: true,
			// * Definimos el archivo de configuracion
			envFilePath: environment[process.env.NODE_ENV] || ['.env', '.env.local'],
			// * Definimos el esquema y la validacion
			load: [config],
			validationSchema: Joi.object(validation),
		}),
		MongooseModule.forRoot(
			`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.HOST_DB}/${process.env.DATABASE}`,
			{
				useNewUrlParser: true,
			},
		),
		AuthModule,
		TransportModule,
		DocumentModule,
	],
})
export class AppModule {}
