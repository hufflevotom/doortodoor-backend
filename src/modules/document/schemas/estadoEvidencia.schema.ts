import { Schema } from 'mongoose';

export const EstadoEvidenciaSchema = new Schema(
	{
		descripcion: { type: String, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
