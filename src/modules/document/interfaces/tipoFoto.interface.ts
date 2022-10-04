import { Document } from 'mongoose';

export interface TipoFoto extends Document {
	_id: string;
	descripcion: string;
	createdAt: Date;
	updatedAt: Date;
}
