import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//* Schemas
import { UsuarioSchema } from './schemas/usuario.schema';
import { TipoRolSchema } from './schemas/tipoRol.schema';
//* Controllers
import { UsuariosController } from './controllers/usuarios/usuarios.controller';
import { RolesController } from './controllers/roles/roles.controller';
//* Services
import { UsuariosService } from './services/usuarios/usuarios.service';
import { RolesService } from './services/roles/roles.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Usuario', schema: UsuarioSchema },
			{ name: 'TipoRol', schema: TipoRolSchema },
		]),
	],
	controllers: [UsuariosController, RolesController],
	providers: [UsuariosService, RolesService],
	exports: [UsuariosService],
})
export class AuthModule {}
