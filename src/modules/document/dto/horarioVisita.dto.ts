import { ApiProperty } from '@nestjs/swagger';

export class HorarioVisitaDto {
	@ApiProperty({ required: false })
	_id: string;

	@ApiProperty({ required: true })
	inicioVisita: number;

	@ApiProperty({ required: true })
	finVisita: number;
}
