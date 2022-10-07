import { ApiProperty } from '@nestjs/swagger';

export class UbicacionEntregaDto {
	@ApiProperty({ required: false })
	_id: string;

	@ApiProperty({ required: true })
	latitud: string;

	@ApiProperty({ required: true })
	longitud: string;

	@ApiProperty({ required: true })
	distrito: string;
}
