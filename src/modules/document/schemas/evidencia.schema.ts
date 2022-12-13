import { Schema } from 'mongoose';

export const EvidenciaSchema = new Schema(
	{
		idFolio: { type: Schema.Types.ObjectId, ref: 'Folio', required: true },
		idResponsable: { type: Schema.Types.ObjectId, ref: 'Responsable', required: true },
		idEstadoEvidencia: { type: Schema.Types.ObjectId, ref: 'EstadoFolio', required: true },
		justificacion: { type: String, required: false },
		latitudFinal: { type: String, required: false },
		longitudFinal: { type: String, required: false },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
