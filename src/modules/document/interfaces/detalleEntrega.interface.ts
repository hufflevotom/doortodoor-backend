import { Document } from 'mongoose';

export interface DetalleEntrega extends Document {
	_id: string;
	fechaEntrega: Date;
	idUbicacionEntrega: string;
	ordenEntrega: number;
	idHorarioVisita: string;
	createdAt: Date;
	updatedAt: Date;
}
