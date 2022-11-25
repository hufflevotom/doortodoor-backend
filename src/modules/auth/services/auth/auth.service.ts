import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// * Interfaces
import { PayloadToken } from '../../interfaces/jwt/token.interface';
import { Usuario } from '../../interfaces/usuarios/usuario.interface';
// * Services
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
	constructor(private usuariosService: UsuariosService, private jwtService: JwtService) {}
	async validateUser(documento: string, contrasena: string): Promise<any> {
		const user = await this.usuariosService.login(documento, contrasena);
		if (user) {
			return user;
		}
		return null;
	}

	generateJWT(user: Usuario) {
		const payload: PayloadToken = { role: user.idTipoRol, sub: user._id };
		return {
			access_token: this.jwtService.sign(payload),
			user,
		};
	}
}
