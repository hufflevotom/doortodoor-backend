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
import { QueryLimitDto } from 'src/common/queryLimit.dto';
import { customResponse } from 'src/common/response';
import { EstadoFolioDto, UpdateEstadoFolioDto } from '../../dto/estado-folio/estadoFolio.dto';
import { EstadoFolioService } from '../../services/estado-folio/estado-folio.service';

@ApiTags('Estado Folio')
@Controller('document/estadoFolio')
export class EstadoFolioController {
	constructor(private readonly estadoFolioService: EstadoFolioService) {}

	@Get()
	@ApiOperation({
		summary: 'Obtener todos los estados del folio',
	})
	async findAll(@Query() query: QueryLimitDto) {
		const model = await this.estadoFolioService.findAll(query);
		const total = await this.estadoFolioService.count();
		return customResponse('Estado', model, 200, total);
	}

	@Get('/:id')
	@ApiOperation({
		summary: 'Obtener un estado por ID',
	})
	async findOne(@Param('id') id: string) {
		const model = await this.estadoFolioService.findOne(id);
		return customResponse('Estado', model);
	}

	@Post()
	@ApiOperation({
		summary: 'Crear un estado',
	})
	async create(@Body() body: EstadoFolioDto) {
		const model = await this.estadoFolioService.create(body);
		return customResponse('Estado creada', model, 201);
	}

	@Put('/:id')
	@ApiOperation({
		summary: 'Actualizar un estado',
	})
	async update(@Param('id') id: string, @Body() body: UpdateEstadoFolioDto) {
		const model = await this.estadoFolioService.update(id, body);

		return customResponse('Estado actualizado', model);
	}

	@Delete('/:id')
	@ApiOperation({
		summary: 'Eliminar un estado',
	})
	async delete(@Param('id') id: string) {
		const model = await this.estadoFolioService.delete(id);
		if (model) {
			return customResponse('Estado eliminado');
		}
		throw new NotFoundException('Estado no encontrado');
	}
}
