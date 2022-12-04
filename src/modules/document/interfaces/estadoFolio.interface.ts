import { Document } from 'mongoose';

export interface EstadoFolio extends Document {
	_id: string;
	descripcion: string;
	createdAt: Date;
	updatedAt: Date;
}
