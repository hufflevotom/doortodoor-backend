import { Document } from 'mongoose';

export interface Responsable extends Document {
	_id: string;
	idUsuario: string;
	idVehiculo: string;
	ruta: string;
	createdAt: Date;
	updatedAt: Date;
}
