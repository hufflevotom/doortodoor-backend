import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class HorarioVisitaDto {
	@IsOptional()
	@IsString()
	@ApiProperty({ required: false })
	_id: string;

	@IsNumber()
	@ApiProperty({ required: true })
	inicioVisita: number;

	@IsNumber()
	@ApiProperty({ required: true })
	finVisita: number;
}
