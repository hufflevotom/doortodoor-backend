import { Document } from 'mongoose';

export interface DetalleCliente extends Document {
	_id: string;
	nombre: string;
	dni: string;
	telefono: string;
	direccion: string;
	createdAt: Date;
	updatedAt: Date;
}
