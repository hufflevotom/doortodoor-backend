import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
//* DTO's
import { FotoClienteDto } from './fotoCliente.dto';

export class EvidenciaDto {
	@IsOptional()
	@IsString()
	@ApiProperty({ required: false })
	_id: string;

	@IsString()
	@ApiProperty({ required: true })
	idResponsable: string;

	@IsString()
	@ApiProperty({ required: true })
	idFolio: string;

	@IsString()
	@ApiProperty({ required: true })
	idEstado: string;

	@IsOptional()
	@IsString()
	@ApiProperty({ required: false })
	justificacion: string;

	@IsOptional()
	@IsString()
	@ApiProperty({ required: false })
	latitudFinal: string;

	@IsOptional()
	@IsString()
	@ApiProperty({ required: false })
	longitudFinal: string;

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => FotoClienteDto)
	@ApiProperty({ type: [FotoClienteDto], required: false })
	imagenes: FotoClienteDto[];
}

export class UpdateEvidenciaDto extends PartialType(EvidenciaDto) {}

export class ReportadoDto {
	@IsOptional()
	@IsString()
	@ApiProperty({ required: false })
	_id: string;

	@IsString()
	@ApiProperty({ required: true })
	idResponsable: string;

	@IsString()
	@ApiProperty({ required: true })
	idFolio: string;

	@IsString()
	@ApiProperty({ required: false })
	justificacion: string;
}

export class SearchEvidenceDto {
	@IsString()
	@ApiProperty({ required: true })
	idResponsable: string;

	@IsString()
	@ApiProperty({ required: true })
	idFolio: string;
}
