import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
// * Decorators
import { ROLES_KEY } from '../../decorators/roles.decorator';
// * Interfaces
import { PayloadToken } from '../../interfaces/jwt/token.interface';
import { TipoRol } from '../../interfaces/roles/roles.interface';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflactor: Reflector) {}
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const roles = this.reflactor.get<TipoRol[]>(ROLES_KEY, context.getHandler());
		if (!roles) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const user = request.user as PayloadToken;

		const isValid = roles.some(role => user.role === role._id);
		if (!isValid) {
			throw new UnauthorizedException('Usuario no autorizado');
		}
		return true;
	}
}
