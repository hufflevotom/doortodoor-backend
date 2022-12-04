import { Schema } from 'mongoose';

export const FolioSchema = new Schema(
	{
		numeroFolio: { type: String, required: true },
		ruta: { type: String, required: true },
		idDetalleCliente: { type: Schema.Types.ObjectId, ref: 'DetalleCliente', required: true },
		idDetalleEntrega: { type: Schema.Types.ObjectId, ref: 'DetalleEntrega', required: true },
		idDetallePedido: { type: Schema.Types.ObjectId, ref: 'DetallePedido', required: true },
		idLocalAbastecimiento: {
			type: Schema.Types.ObjectId,
			ref: 'LocalAbastecimiento',
			required: true,
		},
		idEstado: {
			type: Schema.Types.ObjectId,
			ref: 'EstadoFolio',
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
