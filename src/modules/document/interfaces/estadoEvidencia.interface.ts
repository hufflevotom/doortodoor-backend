import { Document } from 'mongoose';

export interface EstadoEvidencia extends Document {
	_id: string;
	descripcion: string;
	createdAt: Date;
	updatedAt: Date;
}
