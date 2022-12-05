import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FotoClienteDto {
	@IsString()
	@ApiProperty({ required: true })
	urlFoto: string;

	@IsString()
	@ApiProperty({ required: true })
	idTipoFoto: string;
}
