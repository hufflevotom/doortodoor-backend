import { Schema } from 'mongoose';

export const EstadoVehiculoSchema = new Schema(
	{
		idFolio: { type: Schema.Types.ObjectId, ref: 'Folio', required: true },
		idResponsable: { type: Schema.Types.ObjectId, ref: 'Responsable', required: true },
		idEstadoEvidencia: { type: Schema.Types.ObjectId, ref: 'EstadoEvidencia', required: true },
		justificacion: { type: String, required: false },
		latitudFinal: { type: String, required: true },
		longitudFinal: { type: String, required: true },
		numeroVisitas: { type: Number, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
