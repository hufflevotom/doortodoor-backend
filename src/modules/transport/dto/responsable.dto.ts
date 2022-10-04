import { ApiProperty, PartialType } from '@nestjs/swagger';

export class ResponsableDto {
	@ApiProperty({ required: true })
	idUsuario: string;

	@ApiProperty({ required: true })
	idVehiculo: string;

	@ApiProperty({ required: true })
	ruta: string;
}

export class UpdateResponsableDto extends PartialType(ResponsableDto) {}
