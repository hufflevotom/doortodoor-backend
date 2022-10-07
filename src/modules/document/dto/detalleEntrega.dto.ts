import { ApiProperty } from '@nestjs/swagger';
//* DTO's
import { UbicacionEntregaDto } from './ubicacionEntrega.dto';
import { HorarioVisitaDto } from './horarioVisita.dto';

export class DetalleEntregaDto {
	@ApiProperty({ required: false })
	_id: string;

	@ApiProperty({ required: false })
	fechaEntrega: Date;

	@ApiProperty({ required: true })
	idUbicacionEntrega: UbicacionEntregaDto;

	@ApiProperty({ required: true })
	ordenEntrega: number;

	@ApiProperty({ required: true })
	idHorarioVisita: HorarioVisitaDto;
}
