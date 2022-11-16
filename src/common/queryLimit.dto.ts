import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class QueryLimitDto {
	@IsNumber()
	@ApiProperty({ required: true })
	limit: number;

	@IsNumber()
	@ApiProperty({ required: true })
	offset: number;

	@IsOptional()
	@ApiProperty({ required: false })
	busqueda: string;
}
