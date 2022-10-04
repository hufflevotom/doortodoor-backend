import { ApiProperty, PartialType } from '@nestjs/swagger';

export class VehiculoDto {
	@ApiProperty({ required: true })
	placa: string;

	@ApiProperty({ required: true })
	marca: string;

	@ApiProperty({ required: true })
	color: string;

	@ApiProperty({ required: false })
	modelo: string;

	@ApiProperty({ required: false })
	fechaFabricacion: Date;

	@ApiProperty({ required: true })
	idEstadoVehiculo: string;

	@ApiProperty({ required: false })
	vencimientoSoat: Date;

	@ApiProperty({ required: false })
	vencimientoRevision: Date;
}

export class UpdateVehiculoDto extends PartialType(VehiculoDto) {}
