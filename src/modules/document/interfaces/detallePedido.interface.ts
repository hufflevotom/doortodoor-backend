import { Document, ObjectId } from 'mongoose';

export interface DetallePedido extends Document {
	_id: ObjectId;
	descripcionPedido: string;
	createdAt: Date;
	updatedAt: Date;
}
