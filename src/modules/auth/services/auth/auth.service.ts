import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponsablesService } from 'src/modules/transport/services/responsables.service';
// * Interfaces
import { PayloadToken } from '../../interfaces/jwt/token.interface';
import { Usuario } from '../../interfaces/usuarios/usuario.interface';
// * Services
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
	constructor(
		private usuariosService: UsuariosService,
		private responsableService: ResponsablesService,
		private jwtService: JwtService,
	) {}
	async validateUser(documento: string, contrasena: string): Promise<any> {
		const user = await this.usuariosService.login(documento, contrasena);
		if (user) {
			return user;
		}
		return null;
	}

	async generateJWT(user: Usuario) {
		const payload: PayloadToken = { role: user.idTipoRol, sub: user._id };
		let usuario = JSON.parse(JSON.stringify(user));
		if (usuario.idTipoRol === '60bb0fad68bcb70590c9eccd') {
			const resp = await this.responsableService.findByUser(usuario._id);
			if (resp) {
				const responsable = JSON.parse(JSON.stringify(resp));
				usuario = { ...usuario, idVehiculo: responsable.idVehiculo, ruta: responsable.ruta };
			}
		}
		return {
			access_token: this.jwtService.sign(payload),
			user: usuario,
		};
	}
}
