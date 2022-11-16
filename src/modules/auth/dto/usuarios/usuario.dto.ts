import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UsuarioDto {
	@IsOptional()
	@ApiProperty({ required: false })
	_id: string;

	@IsString()
	@ApiProperty({ required: true })
	nombre: string;

	@IsString()
	@ApiProperty({ required: true })
	apellidos: string;

	@IsString()
	@ApiProperty({ required: true })
	documento: string;

	@IsString()
	@ApiProperty({ required: true })
	contrasena: string;

	@IsString()
	@ApiProperty({ required: true })
	idTipoRol: string;

	@IsString()
	@ApiProperty({ required: true })
	celular: string;

	@IsOptional()
	@ApiProperty({ required: false })
	brevete: string;
}

export class UsuarioLimitDto {
	@IsNumber()
	@ApiProperty({ required: true })
	limit: number;

	@IsNumber()
	@ApiProperty({ required: true })
	offset: number;

	@IsOptional()
	@ApiProperty({ required: false })
	busqueda: string;
}

export class LoginUsuarioDto {
	@IsString()
	@ApiProperty({ required: true })
	documento: string;

	@IsString()
	@ApiProperty({ required: true })
	contrasena: string;
}

export class UpdateUsuarioDto extends PartialType(UsuarioDto) {}
