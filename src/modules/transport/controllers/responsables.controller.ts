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
import { ResponsablesService } from '../services/responsables.service';
//* DTO's
import { ManyResponsableDto, ResponsableDto, UpdateResponsableDto } from '../dto/responsable.dto';
import { QueryLimitDto } from 'src/common/queryLimit.dto';

@ApiTags('Responsables')
@Controller('transport/responsables')
export class ResponsablesController {
	constructor(private readonly responsableService: ResponsablesService) {}

	@Get('/fecha/:fecha')
	@ApiOperation({ summary: 'Obtener responsables por fecha de reparto' })
	async findByDate(@Param('fecha') fecha: string, @Query() query: QueryLimitDto) {
		const data = await this.responsableService.findByDate(query, fecha);
		return customResponse('Responsables', data);
	}

	@Get('/:id')
	@ApiOperation({ summary: 'Obtener un responsable' })
	async findOne(@Param('id') id: string) {
		const data = await this.responsableService.findOne(id);
		return customResponse('Responsable', data);
	}

	@Post('/insertMany')
	@ApiOperation({ summary: 'Crear varios responsables' })
	async insertMany(@Body() body: ManyResponsableDto) {
		const data = await this.responsableService.insertMany(body);
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
