import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RolesDto {
	@IsString()
	@ApiProperty({ required: true })
	descripcion: string;
}

export class UpdateRolesDto extends PartialType(RolesDto) {}
