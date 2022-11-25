import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from 'src/config/config';
// * Interfaces
import { PayloadToken } from '../interfaces/jwt/token.interface';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.jwt_secret,
		});
	}

	validate(payload: PayloadToken) {
		return payload;
	}
}
