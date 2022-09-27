import { Document } from 'mongoose';

export interface TipoRol extends Document {
	descripcion: string;
	createdAt: Date;
	updatedAt: Date;
}
