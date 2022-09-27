import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import config, { validation } from './config/config';
import { environment } from './config/enviroments';
import { AuthModule } from './modules/auth/auth.module';
import { join } from 'path';
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
			envFilePath: environment[process.env.NODE_ENV] || '.env',
			// * Definimos el esquema y la validacion
			load: [config],
			validationSchema: Joi.object(validation),
		}),
		MongooseModule.forRoot(`${process.env.MONGODB_URI}`, {
			useNewUrlParser: true,
		}),
		AuthModule,
	],
})
export class AppModule {}
