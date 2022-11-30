import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class VehiculoDto {
	@IsString()
	@ApiProperty({ required: true })
	placa: string;

	@IsOptional()
	@ApiProperty({ required: false })
	marca: string;

	@IsOptional()
	@ApiProperty({ required: false })
	color: string;

	@IsOptional()
	@ApiProperty({ required: false })
	modelo: string;

	@IsDateString()
	@ApiProperty({ required: true })
	fechaFabricacion: string;

	@IsString()
	@ApiProperty({ required: true })
	idEstadoVehiculo: string;

	@IsOptional()
	@IsDateString()
	@ApiProperty({ required: true })
	vencimientoSoat: string;

	@IsOptional()
	@IsDateString()
	@ApiProperty({ required: true })
	vencimientoRevision: string;
}

export class UpdateVehiculoDto extends PartialType(VehiculoDto) {}
