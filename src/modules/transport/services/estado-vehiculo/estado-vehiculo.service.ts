import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryLimitDto } from 'src/common/queryLimit.dto';
import { EstadoVehiculoDto, UpdateEstadoVehiculoDto } from '../../dto/estadoVehiculo.dto';
import { EstadoVehiculo } from '../../interfaces/estadoVehiculo.interface';

@Injectable()
export class EstadoVehiculoService {
	constructor(
		@InjectModel('EstadoVehiculo') private readonly estadoVehiculoModel: Model<EstadoVehiculo>,
	) {}

	findAll(query: QueryLimitDto) {
		return this.estadoVehiculoModel
			.find()
			.sort({ updatedAt: -1 })
			.limit(query.limit)
			.skip(query.offset);
	}

	async count(): Promise<number> {
		return await this.estadoVehiculoModel.count();
	}

	async findOne(id: string): Promise<EstadoVehiculo> {
		return await this.estadoVehiculoModel.findOne({ _id: id });
	}

	async create(dto: EstadoVehiculoDto): Promise<EstadoVehiculo> {
		const newModel = new this.estadoVehiculoModel(dto);
		return await newModel.save();
	}

	async update(id: string, dto: UpdateEstadoVehiculoDto): Promise<EstadoVehiculo> {
		const model = await this.estadoVehiculoModel.findById(id);
		if (!model) {
			throw new NotFoundException('El rol no existe');
		}
		return this.estadoVehiculoModel.findByIdAndUpdate(id, dto, { new: true });
	}

	async delete(id: string): Promise<EstadoVehiculo> {
		return await this.estadoVehiculoModel.findByIdAndDelete(id);
	}
}
