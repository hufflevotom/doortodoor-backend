import { Document, ObjectId } from 'mongoose';

export interface DetalleCliente extends Document {
	_id: ObjectId;
	nombre: string;
	dni: string;
	telefono: string;
	direccion: string;
	createdAt: Date;
	updatedAt: Date;
}
