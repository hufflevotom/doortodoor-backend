import { Schema } from 'mongoose';

export const LocalAbastecimientoSchema = new Schema(
	{
		localAbastecimiento: { type: String, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
