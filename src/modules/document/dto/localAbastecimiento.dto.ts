import { ApiProperty } from '@nestjs/swagger';

export class LocalAbastecimientoDto {
	@ApiProperty({ required: false })
	_id: string;

	@ApiProperty({ required: true })
	localAbastecimiento: string;
}
