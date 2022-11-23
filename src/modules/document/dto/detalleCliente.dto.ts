import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class DetalleClienteDto {
	@IsOptional()
	@IsString()
	@ApiProperty({ required: false })
	_id: string;

	@IsOptional()
	@IsString()
	@ApiProperty({ required: false })
	nombre: string;

	@IsString()
	@ApiProperty({ required: true })
	dni: string;

	@IsString()
	@ApiProperty({ required: true })
	telefono: string;

	@IsString()
	@ApiProperty({ required: true })
	direccion: string;
}
