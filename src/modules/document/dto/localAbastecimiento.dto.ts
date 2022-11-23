import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LocalAbastecimientoDto {
	@IsOptional()
	@IsString()
	@ApiProperty({ required: false })
	_id: string;

	@IsString()
	@ApiProperty({ required: true })
	localAbastecimiento: string;
}
