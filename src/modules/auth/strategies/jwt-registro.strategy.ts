import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from 'src/config/config';
// * Interfaces
import { PayloadToken } from '../interfaces/jwt/token.interface';
// * Services
import { UsuariosService } from '../services/usuarios/usuarios.service';

@Injectable()
export class JWTRegistroStrategy extends PassportStrategy(Strategy, 'jwt-registro') {
	constructor(
		@Inject(config.KEY) configService: ConfigType<typeof config>,
		private usuariosService: UsuariosService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
			ignoreExpiration: false,
			secretOrKey: configService.jwt_secret,
		});
	}

	async validate(payload: PayloadToken) {
		const usuario = await this.usuariosService.findById(payload.sub);
		return usuario;
	}
}
