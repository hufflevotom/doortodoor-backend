import { Schema } from 'mongoose';

export const ResponsableSchema = new Schema(
	{
		idUsuario: {
			type: Schema.Types.ObjectId,
			ref: 'Usuario',
			required: true,
		},
		idVehiculo: {
			type: Schema.Types.ObjectId,
			ref: 'Vehiculo',
			required: true,
		},
		ruta: { type: String, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
