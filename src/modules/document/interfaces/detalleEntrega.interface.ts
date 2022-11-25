import { Document, ObjectId } from 'mongoose';
// * Interfaces
import { HorarioVisita } from './horarioVisita.interface';
import { UbicacionEntrega } from './ubicacionEntrega.interface';

export interface DetalleEntrega extends Document {
	_id: ObjectId;
	fechaEntrega: Date;
	idUbicacionEntrega: UbicacionEntrega;
	ordenEntrega: number;
	idHorarioVisita: HorarioVisita;
	createdAt: Date;
	updatedAt: Date;
}
