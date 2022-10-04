import { Schema } from 'mongoose';

export const VehiculoSchema = new Schema(
	{
		placa: { type: String, required: true },
		marca: { type: String, required: true },
		color: { type: String, required: true },
		modelo: { type: String, required: false },
		fechaFabricacion: { type: Date, required: false },
		idEstadoVehiculo: {
			type: Schema.Types.ObjectId,
			ref: 'EstadoVehiculo',
			required: true,
		},
		vencimientoSoat: { type: Date, required: false },
		vencimientoRevision: { type: Date, required: false },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
