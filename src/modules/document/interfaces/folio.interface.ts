import { Document } from 'mongoose';

export interface Folio extends Document {
	_id: string;
	numeroFolio: string;
	ruta: string;
	idDetalleCliente: string;
	idDetalleEntrega: string;
	idDetallePedido: string;
	idLocalAbastecimiento: string;
	createdAt: Date;
	updatedAt: Date;
}
