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
import { FoliosService } from '../services/folios.service';
//* DTO's
import { QueryLimitDto } from 'src/common/queryLimit.dto';
import { FolioDto, ManyFoliosDto, UpdateFolioDto } from '../dto/folio.dto';

@ApiTags('Folios')
@Controller('document/folios')
export class FoliosController {
	constructor(private readonly foliosService: FoliosService) {}

	@Get()
	@ApiOperation({ summary: 'Obtener todos los folios' })
	async findAll(@Query() query: QueryLimitDto) {
		const data = await this.foliosService.findAll(query);
		const total = await this.foliosService.count();
		return customResponse('Folios', data, 200, total);
	}

	@Get('/:id')
	@ApiOperation({ summary: 'Obtener un folio' })
	async findOne(@Param('id') id: string) {
		const data = await this.foliosService.findOne(id);
		return customResponse('Folio', data);
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

	@Post('')
	@ApiOperation({ summary: 'Crear un folio' })
	async create(@Body() body: FolioDto) {
		const data = await this.foliosService.create(body);
		return customResponse('Folio', data);
	}

	@Post('/insertMany')
	@ApiOperation({ summary: 'Cargar folios' })
	async insertMany(@Body() body: ManyFoliosDto[]) {
		const data = await this.foliosService.insertMany(body);
		return customResponse('Folios', data);
	}

	@Put('/:id')
	@ApiOperation({ summary: 'Actualizar un folio' })
	async update(@Param('id') id: string, @Body() body: UpdateFolioDto) {
		const data = await this.foliosService.update(id, body);
		return customResponse('Folio actualizado', data);
	}
}
