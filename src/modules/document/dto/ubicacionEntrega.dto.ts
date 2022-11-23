import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UbicacionEntregaDto {
	@IsOptional()
	@IsString()
	@ApiProperty({ required: false })
	_id: string;

	@IsString()
	@ApiProperty({ required: true })
	latitud: string;

	@IsString()
	@ApiProperty({ required: true })
	longitud: string;

	@IsString()
	@ApiProperty({ required: true })
	distrito: string;
}
