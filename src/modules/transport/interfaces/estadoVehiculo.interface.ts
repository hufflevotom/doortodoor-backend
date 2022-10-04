import { Document } from 'mongoose';

export interface EstadoVehiculo extends Document {
	_id: string;
	descripcion: string;
	createdAt: Date;
	updatedAt: Date;
}
