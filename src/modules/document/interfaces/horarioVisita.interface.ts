import { Document } from 'mongoose';

export interface HorarioVisita extends Document {
	_id: string;
	inicioVisita: number;
	finVisita: number;
	createdAt: Date;
	updatedAt: Date;
}
