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
import { VehiculosService } from '../services/vehiculos.service';
//* DTO's
import { QueryLimitDto } from 'src/common/queryLimit.dto';
import { UpdateVehiculoDto, VehiculoDto } from '../dto/vehiculos.dto';

@ApiTags('Vehiculos')
@Controller('vehiculos')
export class VehiculosController {
	constructor(private readonly vehiculosService: VehiculosService) {}

	@Get()
	@ApiOperation({ summary: 'Obtener todos los vehículos' })
	async findAll(@Query() query: QueryLimitDto) {
		const data = await this.vehiculosService.findAll(query);
		const total = await this.vehiculosService.count();
		return customResponse('Usuarios', data, 200, total);
	}

	@Get('/:id')
	@ApiOperation({ summary: 'Obtener un vehículo' })
	async findOne(@Param('id') id: string) {
		const data = await this.vehiculosService.findOne(id);
		return customResponse('Vehículo', data);
	}

	@Post()
	@ApiOperation({ summary: 'Crear un vehículo' })
	async create(@Body() body: VehiculoDto) {
		const data = await this.vehiculosService.create(body);
		return customResponse('Vehículo', data);
	}

	@Put('/:id')
	@ApiOperation({ summary: 'Actualizar un vehículo' })
	async update(@Param('id') id: string, @Body() body: UpdateVehiculoDto) {
		const data = await this.vehiculosService.update(id, body);
		return customResponse('Vehículo actualizado', data);
	}

	@Delete('/:id')
	@ApiOperation({
		summary: 'Eliminar un Vehículo',
	})
	async delete(@Param('id') id: string) {
		const data = await this.vehiculosService.delete(id);
		if (data) {
			return customResponse('Vehículo eliminado');
		}
		throw new NotFoundException('Vehículo no encontrado');
	}
}
