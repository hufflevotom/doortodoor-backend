import { ApiProperty } from '@nestjs/swagger';

export class DetalleClienteDto {
	@ApiProperty({ required: false })
	_id: string;

	@ApiProperty({ required: false })
	nombre: string;

	@ApiProperty({ required: true })
	dni: string;

	@ApiProperty({ required: true })
	telefono: string;

	@ApiProperty({ required: true })
	direccion: string;
}
