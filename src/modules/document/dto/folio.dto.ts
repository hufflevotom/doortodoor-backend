import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsDateString,
	IsNotEmptyObject,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
//* DTO's
import { DetalleClienteDto } from './detalleCliente.dto';
import { DetalleEntregaDto } from './detalleEntrega.dto';
import { DetallePedidoDto } from './detallePedido.dto';
import { LocalAbastecimientoDto } from './localAbastecimiento.dto';

export class FolioDto {
	@IsOptional()
	@IsString()
	@ApiProperty({ required: false })
	_id: string;

	@IsString()
	@ApiProperty({ required: true })
	numeroFolio: string;

	@IsString()
	@ApiProperty({ required: true })
	ruta: string;

	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => DetalleClienteDto)
	@ApiProperty({ required: true })
	idDetalleCliente: DetalleClienteDto;

	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => DetalleEntregaDto)
	@ApiProperty({ required: true })
	idDetalleEntrega: DetalleEntregaDto;

	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => DetallePedidoDto)
	@ApiProperty({ required: true })
	idDetallePedido: DetallePedidoDto;

	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => LocalAbastecimientoDto)
	@ApiProperty({ required: true })
	idLocalAbastecimiento: LocalAbastecimientoDto;
}

export class FolioFileDto {
	@IsString()
	@ApiProperty({ required: true })
	Descripcion: string;

	@IsString()
	@ApiProperty({ required: true })
	Direccion: string;

	@IsNumber()
	@ApiProperty({ required: true })
	Dni: number;

	@IsDateString()
	@ApiProperty({ required: true })
	FechaPactada: string;

	@IsNumber()
	@ApiProperty({ required: true })
	FinVisita: number;

	@IsNumber()
	@ApiProperty({ required: true })
	Folio: number;

	@IsNumber()
	@ApiProperty({ required: true })
	IdRuta: number;

	@IsNumber()
	@ApiProperty({ required: true })
	InicioVisita: number;

	@IsNumber()
	@ApiProperty({ required: true })
	Latitud: number;

	@IsNumber()
	@ApiProperty({ required: true })
	LocalAbastece: number;

	@IsString()
	@ApiProperty({ required: true })
	Localidad: string;

	@IsNumber()
	@ApiProperty({ required: true })
	Longitud: number;

	@IsNumber()
	@ApiProperty({ required: true })
	Orden: number;

	@IsString()
	@ApiProperty({ required: true })
	Producto: string;

	@IsString()
	@ApiProperty({ required: true })
	Telefono: string;
}

export class ManyFoliosDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => FolioFileDto)
	@ApiProperty({ type: [FolioFileDto], required: true })
	name: FolioFileDto[];
}

export class UpdateFolioDto extends PartialType(FolioDto) {}

export class FolioQueryLimitDto {
	@IsNumber()
	@ApiProperty({ required: true })
	limit: number;

	@IsNumber()
	@ApiProperty({ required: true })
	offset: number;

	@IsOptional()
	@ApiProperty({ required: false })
	criterio: string;

	@IsOptional()
	@ApiProperty({ required: false })
	busqueda: string;
}
