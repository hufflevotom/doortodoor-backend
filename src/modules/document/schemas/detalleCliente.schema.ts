import { Schema } from 'mongoose';

export const DetalleClienteSchema = new Schema(
	{
		nombre: { type: String, required: false },
		dni: { type: String, required: true },
		telefono: { type: String, required: true },
		direccion: { type: String, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
