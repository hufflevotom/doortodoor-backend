import { ApiProperty } from '@nestjs/swagger';

export class QueryLimitDto {
	@ApiProperty({ required: true })
	limit: number;

	@ApiProperty({ required: true })
	offset: number;

	@ApiProperty({ required: false })
	busqueda: string;
}
