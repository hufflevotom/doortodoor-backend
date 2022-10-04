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
import { RolesService } from '../../services/roles/roles.service';
//* DTO's
import { RolesDto, RolesLimitDto, UpdateRolesDto } from '../../dto/roles/roles.dto';

@ApiTags('Roles')
@Controller('auth/roles')
export class RolesController {
	constructor(private readonly rolesService: RolesService) {}

	@Get()
	@ApiOperation({
		summary: 'Obtener todos los roles',
	})
	async findAll(@Query() query: RolesLimitDto) {
		const model = await this.rolesService.findAll(query);
		const total = await this.rolesService.count();
		return customResponse('roles', model, 200, total);
	}

	@Get('/:id')
	@ApiOperation({
		summary: 'Obtener un rol por ID',
	})
	async findOne(@Param('id') id: string) {
		const model = await this.rolesService.findOne(id);
		return customResponse('Rol', model);
	}

	@Post()
	@ApiOperation({
		summary: 'Crear un rol',
	})
	async create(@Body() body: RolesDto) {
		const model = await this.rolesService.create(body);
		return customResponse('Rol creada', model, 201);
	}

	@Put('/:id')
	@ApiOperation({
		summary: 'Actualizar un rol',
	})
	async update(@Param('id') id: string, @Body() body: UpdateRolesDto) {
		const model = await this.rolesService.update(id, body);

		return customResponse('Rol actualizado', model);
	}

	@Delete('/:id')
	@ApiOperation({
		summary: 'Eliminar un rol',
	})
	async delete(@Param('id') id: string) {
		const model = await this.rolesService.delete(id);
		if (model) {
			return customResponse('Rol eliminado');
		}
		throw new NotFoundException('Rol no encontrado');
	}
}
