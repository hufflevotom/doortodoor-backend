import { Document } from 'mongoose';

export interface DetallePedido extends Document {
	_id: string;
	descripcionPedido: string;
	createdAt: Date;
	updatedAt: Date;
}
