import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
//* Utils
import { customResponse } from 'src/common/response';
//* Services
import { UsuariosService } from '../../services/usuarios/usuarios.service';
//* DTO's
import {
	LoginUsuarioDto,
	UpdateUsuarioDto,
	UsuarioDto,
	UsuarioLimitDto,
} from '../../dto/usuarios/usuario.dto';
import { QueryLimitDto } from 'src/common/queryLimit.dto';

@ApiTags('Usuarios')
@Controller('auth/usuarios')
export class UsuariosController {
	constructor(private readonly usuariosService: UsuariosService) {}

	@Get()
	@ApiOperation({ summary: 'Obtener Todos los Usuarios' })
	async findAll(@Query() query: UsuarioLimitDto) {
		const usuarios = await this.usuariosService.findAll(query);
		const total = await this.usuariosService.count();
		return customResponse('Usuarios', usuarios, 200, total);
	}

	@Get('/repartidores')
	@ApiOperation({ summary: 'Obtener usuarios repartidores' })
	async findRepartidores(@Query() query: QueryLimitDto) {
		const usuario = await this.usuariosService.findRepartidores(query);
		return customResponse('Usuarios', usuario);
	}

	@Get('/:id')
	@ApiOperation({ summary: 'Obtener un usuario' })
	async findOne(@Param('id') id: string) {
		const usuario = await this.usuariosService.findOne(id);
		return customResponse('Usuario', usuario);
	}

	@Post()
	@ApiOperation({ summary: 'Crear un Usuario' })
	async create(@Body() body: UsuarioDto) {
		const usuarioCreated = await this.usuariosService.create(body);
		return customResponse('Usuario', usuarioCreated);
	}

	@Put('/:id')
	@ApiOperation({ summary: 'Actualizar un Usuario' })
	async update(@Param('id') id: string, @Body() body: UpdateUsuarioDto) {
		const updatedFamilia = await this.usuariosService.update(id, body);
		return customResponse('Usuario actualizado', updatedFamilia);
	}

	@Delete('/:id')
	@ApiOperation({
		summary: 'Eliminar un Usuario',
	})
	async delete(@Param('id') id: string) {
		const deleteResult = await this.usuariosService.delete(id);
		if (deleteResult) {
			console.log('deleteResult', deleteResult);
			return customResponse('Usuario eliminado');
		}
		throw new NotFoundException('Usuario no encontrado');
	}

	@Post('/login')
	@ApiOperation({ summary: 'Login de Usuario' })
	async login(@Body() body: LoginUsuarioDto) {
		const loginResult = await this.usuariosService.login(body.documento, body.contrasena);
		return customResponse('login', loginResult);
	}
}
