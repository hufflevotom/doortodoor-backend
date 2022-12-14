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
import { FoliosService } from '../../services/folios/folios.service';
//* DTO's
import {
	FolioDto,
	FolioQueryLimitDto,
	ManyFoliosDto,
	ManyFoliosIdsDto,
	UpdateFolioDto,
} from '../../dto/folio/folio.dto';
import { QueryLimitDto } from 'src/common/queryLimit.dto';

@ApiTags('Folios')
@Controller('document/folios')
export class FoliosController {
	constructor(private readonly foliosService: FoliosService) {}

	@Get()
	@ApiOperation({ summary: 'Obtener todos los folios' })
	async findAll(@Query() query: FolioQueryLimitDto) {
		const model = await this.foliosService.findAll(query);
		return customResponse('Folios', model.data, 200, model.total);
	}

	@Get('/fecha/:fecha')
	@ApiOperation({ summary: 'Obtener los folios a entregar' })
	async getAllByDate(@Param('fecha') fecha: string, @Query() query: QueryLimitDto) {
		const data = await this.foliosService.getAllByDate(query, fecha);
		return customResponse('Rutas', data);
	}

	@Get('/ruta/:ruta')
	@ApiOperation({ summary: 'Obtener los folios a entregar' })
	async findByRuta(@Param('ruta') ruta: string) {
		const data = await this.foliosService.findByRuta(ruta);
		return customResponse('Rutas', data);
	}

	@Get('/rutas')
	@ApiOperation({ summary: 'Obtener las rutas a planificar' })
	async rutas() {
		const data = await this.foliosService.getRutas();
		return customResponse('Rutas', data);
	}

	@Get('/validarEstadoCarga')
	@ApiOperation({ summary: 'Validar estado de planificacion' })
	async validarEstadoCarga() {
		const data = await this.foliosService.validarEstadoCarga();
		return customResponse('Rutas', data);
	}

	@Post()
	@ApiOperation({ summary: 'Crear un folio' })
	async create(@Body() body: FolioDto) {
		const data = await this.foliosService.create(body);
		return customResponse('Folio', data);
	}

	@Get('/:id')
	@ApiOperation({ summary: 'Obtener un folio' })
	async findOne(@Param('id') id: string) {
		const data = await this.foliosService.findOne(id);
		return customResponse('Folio', data);
	}

	@Put('/activo/:id')
	@ApiOperation({ summary: 'Cambiar estado de un folio a activo' })
	async setActiveFolio(@Param('id') id: string) {
		const data = await this.foliosService.updateActiveEstadoFolio(id);
		return customResponse('Folio', data);
	}

	@Put('/:id')
	@ApiOperation({ summary: 'Actualizar un folio' })
	async update(@Param('id') id: string, @Body() body: UpdateFolioDto) {
		const data = await this.foliosService.update(id, body);
		return customResponse('Folio actualizado', data);
	}

	@Delete('/:id')
	@ApiOperation({
		summary: 'Eliminar un folio',
	})
	async delete(@Param('id') id: string) {
		const data = await this.foliosService.delete(id);
		if (data) {
			return customResponse('Folio eliminado');
		}
		throw new NotFoundException('Folio no encontrado');
	}

	@Post('/insertMany')
	@ApiOperation({ summary: 'Cargar folios' })
	async insertMany(@Body() body: ManyFoliosDto) {
		const data = await this.foliosService.insertMany(body);
		return customResponse('Folios', data);
	}
	@Post('/multiples')
	@ApiOperation({ summary: 'Obtener m??ltiples folios' })
	async getMany(@Body() body: ManyFoliosIdsDto) {
		const data = await this.foliosService.findMany(body);
		return customResponse('Folios', data);
	}
}
