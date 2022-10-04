import { Schema } from 'mongoose';

export const FotoClienteSchema = new Schema(
	{
		urlFoto: { type: String, required: false },
		idTipoFoto: { type: Schema.Types.ObjectId, ref: 'TipoFoto', required: true },
		idEvidencia: { type: Schema.Types.ObjectId, ref: 'Evidencia', required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
