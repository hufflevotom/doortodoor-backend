import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EstadoVehiculoDto {
	@IsString()
	@ApiProperty({ required: true })
	descripcion: string;
}

export class UpdateEstadoVehiculoDto extends PartialType(EstadoVehiculoDto) {}
