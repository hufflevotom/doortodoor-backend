import { Document, ObjectId } from 'mongoose';

export interface HorarioVisita extends Document {
	_id: ObjectId;
	inicioVisita: number;
	finVisita: number;
	createdAt: Date;
	updatedAt: Date;
}
