import { Document, ObjectId } from 'mongoose';

export interface Responsable extends Document {
	_id: ObjectId;
	idUsuario: string;
	idVehiculo: string;
	ruta: string;
	createdAt: Date;
	updatedAt: Date;
}
