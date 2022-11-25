import { Document, ObjectId } from 'mongoose';

export interface UbicacionEntrega extends Document {
	_id: ObjectId;
	latitud: string;
	longitud: string;
	distrito: string;
	createdAt: Date;
	updatedAt: Date;
}
