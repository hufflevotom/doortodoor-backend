import { Document } from 'mongoose';

export interface Vehiculo extends Document {
	_id: string;
	placa: string;
	marca: string;
	color: string;
	modelo: string;
	fechaFabricacion: Date;
	idEstadoVehiculo: string;
	vencimientoSoat: Date;
	vencimientoRevision: Date;
	createdAt: Date;
	updatedAt: Date;
}
