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
import { EvidenciaDto, ReportadoDto, UpdateEvidenciaDto } from '../../dto/evidencia/evidencia.dto';
import { EvidenciasService } from '../../services/evidencias/evidencias.service';

@ApiTags('Evidencias')
@Controller('document/evidencias')
export class EvidenciasController {
	constructor(private readonly evidenciasService: EvidenciasService) {}

	@Get()
	@ApiOperation({
		summary: 'Obtener todas las evidencias',
	})
	async findAll(@Query() query: QueryLimitDto) {
		const model = await this.evidenciasService.findAll(query);
		const total = await this.evidenciasService.count();
		return customResponse('Evidencia', model, 200, total);
	}

	@Get('/folio/:id')
	@ApiOperation({
		summary: 'Obtener todas las evidencias por ID de folio',
	})
	async findAllByFolio(@Param('id') id: string) {
		const model = await this.evidenciasService.findAllByFolio(id);
		return customResponse('Evidencia', model);
	}

	@Get('/:id')
	@ApiOperation({
		summary: 'Obtener una evidencia por ID',
	})
	async findOne(@Param('id') id: string) {
		const model = await this.evidenciasService.findOne(id);
		return customResponse('Evidencia', model);
	}

	@Post('/reportar')
	@ApiOperation({
		summary: 'Crear un reporte',
	})
	async createReporte(@Body() body: ReportadoDto) {
		const model = await this.evidenciasService.createReporte(body);
		return customResponse('Reporte creado', model, 201);
	}

	@Post()
	@ApiOperation({
		summary: 'Crear una evidencia',
	})
	async create(@Body() body: EvidenciaDto) {
		const model = await this.evidenciasService.create(body);
		return customResponse('Evidencia creada', model, 201);
	}

	@Put('/:id')
	@ApiOperation({
		summary: 'Actualizar una evidencia',
	})
	async update(@Param('id') id: string, @Body() body: UpdateEvidenciaDto) {
		const model = await this.evidenciasService.update(id, body);

		return customResponse('Evidencia actualizada', model);
	}

	@Delete('/:id')
	@ApiOperation({
		summary: 'Eliminar una evidencia',
	})
	async delete(@Param('id') id: string) {
		const model = await this.evidenciasService.delete(id);
		if (model) {
			return customResponse('Evidencia eliminada');
		}
		throw new NotFoundException('Evidencia no encontrada');
	}
}
