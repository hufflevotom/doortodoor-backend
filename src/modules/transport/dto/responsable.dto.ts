import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class ResponsableDto {
	@IsString()
	@ApiProperty({ required: true })
	idUsuario: string;

	@IsString()
	@ApiProperty({ required: true })
	idVehiculo: string;

	@IsString()
	@ApiProperty({ required: true })
	ruta: string;
}

export class ManyResponsableDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ResponsableDto)
	@ApiProperty({ type: [ResponsableDto], required: true })
	responsables: ResponsableDto[];
}

export class UpdateResponsableDto extends PartialType(ResponsableDto) {}
