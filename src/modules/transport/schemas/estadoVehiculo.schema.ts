import { Schema } from 'mongoose';

export const EstadoVehiculoSchema = new Schema(
	{
		descripcion: { type: String, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
