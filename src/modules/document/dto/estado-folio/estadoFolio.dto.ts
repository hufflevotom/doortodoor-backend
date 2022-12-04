import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EstadoFolioDto {
	@IsString()
	@ApiProperty({ required: true })
	descripcion: string;
}

export class UpdateEstadoFolioDto extends PartialType(EstadoFolioDto) {}
