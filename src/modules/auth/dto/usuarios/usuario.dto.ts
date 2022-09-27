import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UsuarioDto {
	@ApiProperty({ required: true })
	nombre: string;

	@ApiProperty({ required: true })
	apellidos: string;

	@ApiProperty({ required: true })
	documento: string;

	@ApiProperty({ required: true })
	contrasena: string;

	@ApiProperty({ required: true })
	idTipoRol: string;

	@ApiProperty({ required: false })
	celular: string;

	@ApiProperty({ required: false })
	brevete: string;
}

export class UsuarioLimitDto {
	@ApiProperty({ required: true })
	limit: number;

	@ApiProperty({ required: true })
	offset: number;

	@ApiProperty({ required: false })
	busqueda: string;
}

export class LoginUsuarioDto {
	@ApiProperty({ required: true })
	documento: string;

	@ApiProperty({ required: true })
	contrasena: string;
}

export class UpdateUsuarioDto extends PartialType(UsuarioDto) {}
