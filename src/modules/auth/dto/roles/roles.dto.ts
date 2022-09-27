import { ApiProperty, PartialType } from '@nestjs/swagger';

export class RolesDto {
	@ApiProperty({ required: true })
	descripcion: string;
}

export class RolesLimitDto {
	@ApiProperty({ required: true })
	limit: number;

	@ApiProperty({ required: true })
	offset: number;

	@ApiProperty({ required: false })
	busqueda: string;
}

export class UpdateRolesDto extends PartialType(RolesDto) {}
