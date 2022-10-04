import { Document } from 'mongoose';

export interface Evidencia extends Document {
	_id: string;
	idFolio: string;
	idResponsable: string;
	idEstadoEvidencia: string;
	justificacion: string;
	latitudFinal: string;
	longitudFinal: string;
	numeroVisitas: number;
	createdAt: Date;
	updatedAt: Date;
}
