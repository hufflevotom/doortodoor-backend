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
import { EstadoVehiculoDto, UpdateEstadoVehiculoDto } from '../../dto/estadoVehiculo.dto';
import { EstadoVehiculoService } from '../../services/estado-vehiculo/estado-vehiculo.service';

@ApiTags('Estado Vehiculo')
@Controller('transport/estadoVehiculo')
export class EstadoVehiculoController {
	constructor(private readonly estadoVehiculoService: EstadoVehiculoService) {}

	@Get()
	@ApiOperation({
		summary: 'Obtener todos los estados del vehículo',
	})
	async findAll(@Query() query: QueryLimitDto) {
		const model = await this.estadoVehiculoService.findAll(query);
		const total = await this.estadoVehiculoService.count();
		return customResponse('Estado', model, 200, total);
	}

	@Get('/:id')
	@ApiOperation({
		summary: 'Obtener un rol por ID',
	})
	async findOne(@Param('id') id: string) {
		const model = await this.estadoVehiculoService.findOne(id);
		return customResponse('Estado', model);
	}

	@Post()
	@ApiOperation({
		summary: 'Crear un rol',
	})
	async create(@Body() body: EstadoVehiculoDto) {
		const model = await this.estadoVehiculoService.create(body);
		return customResponse('Estado creada', model, 201);
	}

	@Put('/:id')
	@ApiOperation({
		summary: 'Actualizar un rol',
	})
	async update(@Param('id') id: string, @Body() body: UpdateEstadoVehiculoDto) {
		const model = await this.estadoVehiculoService.update(id, body);

		return customResponse('Estado actualizado', model);
	}

	@Delete('/:id')
	@ApiOperation({
		summary: 'Eliminar un rol',
	})
	async delete(@Param('id') id: string) {
		const model = await this.estadoVehiculoService.delete(id);
		if (model) {
			return customResponse('Estado eliminado');
		}
		throw new NotFoundException('Estado no encontrado');
	}
}
