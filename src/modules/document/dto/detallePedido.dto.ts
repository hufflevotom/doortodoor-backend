import { ApiProperty } from '@nestjs/swagger';

export class DetallePedidoDto {
	@ApiProperty({ required: false })
	_id: string;

	@ApiProperty({ required: true })
	descripcionPedido: string;
}
