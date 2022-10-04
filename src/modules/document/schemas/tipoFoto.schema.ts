import { Schema } from 'mongoose';

export const TipoFotoSchema = new Schema(
	{
		descripcion: { type: String, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
