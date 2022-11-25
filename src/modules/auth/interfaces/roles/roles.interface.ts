import { Document } from 'mongoose';

export interface TipoRol extends Document {
	_id: string;
	descripcion: string;
	createdAt: Date;
	updatedAt: Date;
}

// export enum Role {
// 	ADMIN = 'admin',
// 	DISTRIBUTOR = 'distributor',
// }
