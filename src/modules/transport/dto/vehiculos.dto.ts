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

	@IsOptional()
	@IsDateString()
	@ApiProperty({ required: false })
	fechaFabricacion: string;

	@IsString()
	@ApiProperty({ required: true })
	idEstadoVehiculo: string;

	@IsOptional()
	@IsDateString()
	@ApiProperty({ required: false })
	vencimientoSoat: string;

	@IsOptional()
	@IsDateString()
	@ApiProperty({ required: false })
	vencimientoRevision: string;
}

export class UpdateVehiculoDto extends PartialType(VehiculoDto) {}
