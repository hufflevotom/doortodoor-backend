import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
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

export class ManyFoliosDto {
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

export class UpdateFolioDto extends PartialType(FolioDto) {}
