import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsDateString,
	IsNotEmptyObject,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
//* DTO's
import { UbicacionEntregaDto } from './ubicacionEntrega.dto';
import { HorarioVisitaDto } from './horarioVisita.dto';

export class DetalleEntregaDto {
	@IsOptional()
	@IsString()
	@ApiProperty({ required: false })
	_id: string;

	@IsOptional()
	@IsDateString()
	@ApiProperty({ required: false })
	fechaEntrega: string;

	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => UbicacionEntregaDto)
	@ApiProperty({ required: true })
	idUbicacionEntrega: UbicacionEntregaDto;

	@IsNumber()
	@ApiProperty({ required: true })
	ordenEntrega: number;

	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => HorarioVisitaDto)
	@ApiProperty({ required: true })
	idHorarioVisita: HorarioVisitaDto;
}
