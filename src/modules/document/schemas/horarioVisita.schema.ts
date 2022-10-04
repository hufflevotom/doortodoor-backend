import { Schema } from 'mongoose';

export const HorarioVisitaSchema = new Schema(
	{
		inicioVisita: { type: Number, required: true },
		finVisita: { type: Number, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
