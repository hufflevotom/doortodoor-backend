import { ApiProperty, PartialType } from '@nestjs/swagger';
//* DTO's
import { DetalleClienteDto } from './detalleCliente.dto';
import { DetalleEntregaDto } from './detalleEntrega.dto';
import { DetallePedidoDto } from './detallePedido.dto';
import { LocalAbastecimientoDto } from './localAbastecimiento.dto';

export class FolioDto {
	@ApiProperty({ required: false })
	_id: string;

	@ApiProperty({ required: true })
	numeroFolio: string;

	@ApiProperty({ required: true })
	ruta: string;

	@ApiProperty({ required: true })
	idDetalleCliente: DetalleClienteDto;

	@ApiProperty({ required: true })
	idDetalleEntrega: DetalleEntregaDto;

	@ApiProperty({ required: true })
	idDetallePedido: DetallePedidoDto;

	@ApiProperty({ required: true })
	idLocalAbastecimiento: LocalAbastecimientoDto;
}

export class UpdateFolioDto extends PartialType(FolioDto) {}
