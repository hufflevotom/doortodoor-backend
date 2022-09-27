import { Document } from 'mongoose';

export interface Usuario extends Document {
	documento: string;
	contrasena: string;
	nombre: string;
	apellidos: string;
	celular: string;
	idTipoRol: string;
	brevete: string;
	createdAt: Date;
	updatedAt: Date;
}
