import { Schema } from 'mongoose';

export const TipoRolSchema = new Schema(
	{
		descripcion: { type: String, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
