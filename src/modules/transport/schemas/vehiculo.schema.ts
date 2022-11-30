import { Schema } from 'mongoose';

export const VehiculoSchema = new Schema(
	{
		placa: { type: String, required: true },
		marca: { type: String, required: false },
		color: { type: String, required: false },
		modelo: { type: String, required: false },
		fechaFabricacion: { type: Date, required: true },
		idEstadoVehiculo: {
			type: Schema.Types.ObjectId,
			ref: 'EstadoVehiculo',
			required: true,
		},
		vencimientoSoat: { type: Date, required: true },
		vencimientoRevision: { type: Date, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
