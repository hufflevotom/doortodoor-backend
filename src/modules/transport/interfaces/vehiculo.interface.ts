import { Document, ObjectId } from 'mongoose';

export interface Vehiculo extends Document {
	_id: ObjectId;
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
