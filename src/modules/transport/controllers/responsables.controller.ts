import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
//* Utils
import { customResponse } from 'src/common/response';
//* Services
import { ResponsablesService } from '../services/responsables.service';
//* DTO's
import { ResponsableDto, UpdateResponsableDto } from '../dto/responsable.dto';

@ApiTags('Responsables')
@Controller('transport/responsables')
export class ResponsablesController {
	constructor(private readonly responsableService: ResponsablesService) {}

	@Get('/:id')
	@ApiOperation({ summary: 'Obtener un responsable' })
	async findOne(@Param('id') id: string) {
		const data = await this.responsableService.findOne(id);
		return customResponse('Responsable', data);
	}

	@Post()
	@ApiOperation({ summary: 'Crear un responsable' })
	async create(@Body() body: ResponsableDto) {
		const data = await this.responsableService.create(body);
		return customResponse('Responsable', data);
	}

	@Put('/:id')
	@ApiOperation({ summary: 'Actualizar un responsable' })
	async update(@Param('id') id: string, @Body() body: UpdateResponsableDto) {
		const data = await this.responsableService.update(id, body);
		return customResponse('Responsable actualizado', data);
	}

	@Delete('/:id')
	@ApiOperation({
		summary: 'Eliminar un responsable',
	})
	async delete(@Param('id') id: string) {
		const data = await this.responsableService.delete(id);
		if (data) {
			return customResponse('Responsable eliminado');
		}
		throw new NotFoundException('Responsable no encontrado');
	}
}
