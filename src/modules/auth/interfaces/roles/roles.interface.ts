import { Document, ObjectId } from 'mongoose';

export interface TipoRol extends Document {
	_id: ObjectId;
	descripcion: string;
	createdAt: Date;
	updatedAt: Date;
}
