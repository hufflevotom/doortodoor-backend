import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC } from '../../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super();
	}

	canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.get<boolean>(IS_PUBLIC, context.getHandler());
		if (isPublic) {
			return true;
		}
		return super.canActivate(context);
	}

	handleRequest(err, user, info) {
		if (err || !user) {
			throw new HttpException(
				{
					status: HttpStatus.UNAUTHORIZED,
					error: 'Usuario no autorizado',
				},
				HttpStatus.UNAUTHORIZED,
			);
		}
		return user;
	}
}
