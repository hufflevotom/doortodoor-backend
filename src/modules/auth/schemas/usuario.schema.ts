import { Schema } from 'mongoose';

export const UsuarioSchema = new Schema(
	{
		documento: { type: String, required: true },
		contrasena: { type: String, required: true },
		nombre: { type: String, required: true },
		apellidos: { type: String, required: true },
		celular: { type: String, required: true },
		idTipoRol: {
			type: Schema.Types.ObjectId,
			ref: 'TipoRol',
			required: true,
		},
		brevete: { type: String, required: false },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
