import { Document, ObjectId } from 'mongoose';

export interface EstadoVehiculo extends Document {
	_id: ObjectId;
	descripcion: string;
	createdAt: Date;
	updatedAt: Date;
}
