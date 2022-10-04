import { Document } from 'mongoose';

export interface FotoCliente extends Document {
	_id: string;
	urlFoto: string;
	idTipoFoto: string;
	idEvidencia: string;
	createdAt: Date;
	updatedAt: Date;
}
