import { Schema } from 'mongoose';

export const DetallePedidoSchema = new Schema(
	{
		descripcionPedido: { type: String, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
