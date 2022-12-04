import { Schema } from 'mongoose';

export const EstadoFolioSchema = new Schema(
	{
		descripcion: { type: String, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
