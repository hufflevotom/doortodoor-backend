import { Schema } from 'mongoose';

export const UbicacionEntregaSchema = new Schema(
	{
		latitud: { type: String, required: true },
		longitud: { type: String, required: true },
		distrito: { type: String, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
