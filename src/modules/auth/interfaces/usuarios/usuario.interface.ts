import { Document, ObjectId } from 'mongoose';

export interface Usuario extends Document {
	_id: ObjectId;
	documento: string;
	contrasena: string;
	nombre: string;
	apellidos: string;
	celular: string;
	idTipoRol: ObjectId;
	brevete: string;
	createdAt: Date;
	updatedAt: Date;
}
