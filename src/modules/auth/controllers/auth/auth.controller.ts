import { Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
// * Interfaces
import { Usuario } from '../../interfaces/usuarios/usuario.interface';
// * Services
import { AuthService } from '../../services/auth/auth.service';
// * DTOs
import { LoginUsuarioDto } from '../../dto/usuarios/usuario.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	@UseGuards(AuthGuard('local'))
	@ApiBody({ type: LoginUsuarioDto })
	login(@Req() req: Request) {
		const user = req.user as Usuario;
		return this.authService.generateJWT(user);
	}

	@Get('login/token')
	@UseGuards(AuthGuard('jwt-registro'))
	@ApiQuery({ name: 'token' })
	loginToken(@Req() req: Request) {
		const user = req.user as Usuario;
		return this.authService.generateJWT(user);
	}
}
