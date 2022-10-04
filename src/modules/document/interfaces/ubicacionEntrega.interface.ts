import { Document } from 'mongoose';

export interface UbicacionEntrega extends Document {
	_id: string;
	latitud: string;
	longitud: string;
	distrito: string;
	createdAt: Date;
	updatedAt: Date;
}
