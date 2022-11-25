import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config/config';
//* Schemas
import { UsuarioSchema } from './schemas/usuario.schema';
import { TipoRolSchema } from './schemas/tipoRol.schema';
//* Controllers
import { UsuariosController } from './controllers/usuarios/usuarios.controller';
import { RolesController } from './controllers/roles/roles.controller';
//* Services
import { UsuariosService } from './services/usuarios/usuarios.service';
import { RolesService } from './services/roles/roles.service';
import { AuthService } from './services/auth/auth.service';
//* Strategies
import { LocalStrategy } from './strategies/local.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';
import { JWTRegistroStrategy } from './strategies/jwt-registro.strategy';
import { AuthController } from './controllers/auth/auth.controller';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Usuario', schema: UsuarioSchema },
			{ name: 'TipoRol', schema: TipoRolSchema },
		]),
		JwtModule.registerAsync({
			useFactory: (configService: ConfigType<typeof config>) => ({
				secret: configService.jwt_secret,
				signOptions: { expiresIn: '10d' },
			}),
			inject: [config.KEY],
		}),
	],
	providers: [
		UsuariosService,
		RolesService,
		AuthService,
		LocalStrategy,
		JWTStrategy,
		JWTRegistroStrategy,
	],
	controllers: [UsuariosController, RolesController, AuthController],
	exports: [UsuariosService],
})
export class AuthModule {}
