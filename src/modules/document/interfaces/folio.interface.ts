import { Document, ObjectId } from 'mongoose';
// * Interfaces
import { DetalleCliente } from './detalleCliente.interface';
import { DetalleEntrega } from './detalleEntrega.interface';
import { DetallePedido } from './detallePedido.interface';
import { LocalAbastecimiento } from './localAbastecimiento.interface';

export interface Folio extends Document {
	_id: ObjectId;
	numeroFolio: string;
	ruta: string;
	idDetalleCliente: DetalleCliente;
	idDetalleEntrega: DetalleEntrega;
	idDetallePedido: DetallePedido;
	idLocalAbastecimiento: LocalAbastecimiento;
	createdAt: Date;
	updatedAt: Date;
}
