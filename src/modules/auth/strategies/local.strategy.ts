import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
// * Services
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
	constructor(private authService: AuthService) {
		super({
			usernameField: 'documento',
			passwordField: 'contrasena',
		});
	}

	async validate(documento: string, contrasena: string) {
		const user = await this.authService.validateUser(documento, contrasena);
		if (!user) {
			throw new UnauthorizedException('Usuario o contraseña incorrecta');
		}
		return user;
	}
}
