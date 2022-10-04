import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//* Interfaces
import { EstadoVehiculo } from '../interfaces/estadoVehiculo.interface';
import { Vehiculo } from '../interfaces/vehiculo.interface';
//* DTO's
import { QueryLimitDto } from 'src/common/queryLimit.dto';
//* Services
import { UpdateVehiculoDto, VehiculoDto } from '../dto/vehiculos.dto';

@Injectable()
export class VehiculosService {
	constructor(
		@InjectModel('Vehiculo') private readonly vehiculoModel: Model<Vehiculo>,
		@InjectModel('EstadoVehiculo') private readonly estadoVehiculoModel: Model<EstadoVehiculo>,
	) {}

	findAll(query: QueryLimitDto) {
		return this.vehiculoModel
			.find()
			.sort({ updatedAt: -1 })
			.limit(query.limit)
			.skip(query.offset)
			.populate('idEstadoVehiculo');
	}

	async count(): Promise<number> {
		return await this.vehiculoModel.count();
	}

	async findOne(id: string): Promise<Vehiculo> {
		return await this.vehiculoModel.findById(id);
	}

	async create(vehiculo: VehiculoDto): Promise<Vehiculo> {
		const estado = await this.estadoVehiculoModel.findById(vehiculo.idEstadoVehiculo);
		if (!estado) {
			throw new NotFoundException('El estado no existe');
		}

		const newModel = new this.vehiculoModel(vehiculo);
		return await newModel.save();
	}

	async update(id: string, vehiculo: UpdateVehiculoDto): Promise<Vehiculo> {
		const modelActualizar = await this.vehiculoModel.findById(id);
		if (!modelActualizar) {
			throw new NotFoundException('El vehiculo no existe');
		}
		if (vehiculo.idEstadoVehiculo) {
			const estado = await this.estadoVehiculoModel.findById(vehiculo.idEstadoVehiculo);
			if (!estado) {
				throw new NotFoundException('El estado no existe');
			}
			vehiculo.idEstadoVehiculo = vehiculo.idEstadoVehiculo;
		}
		return await this.vehiculoModel.findByIdAndUpdate(id, vehiculo, { new: true });
	}

	async delete(id: string): Promise<Vehiculo> {
		return await this.vehiculoModel.findByIdAndDelete(id);
	}
}
