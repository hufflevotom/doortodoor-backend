import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//* Interfaces
import { Responsable } from '../interfaces/responsable.interface';
//* DTO's
import { ManyResponsableDto, ResponsableDto, UpdateResponsableDto } from '../dto/responsable.dto';
//* Services
import { VehiculosService } from './vehiculos.service';
import { UsuariosService } from 'src/modules/auth/services/usuarios/usuarios.service';

@Injectable()
export class ResponsablesService {
	constructor(
		private vehiculoService: VehiculosService,
		@InjectModel('Responsable') private readonly responsableModel: Model<Responsable>,
		private usuarioService: UsuariosService,
	) {}

	async getResponsablesDia() {
		return await this.responsableModel.find({
			createdAt: {
				$gte: new Date().setHours(0, 0, 0, 0),
				$lte: new Date().setHours(23, 59, 59, 999),
			},
		});
	}

	async findOne(id: string): Promise<Responsable> {
		return await this.responsableModel.findById(id);
	}

	async findByUser(idUsuario: string) {
		const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
		return await this.responsableModel
			.findOne({
				idUsuario,
				createdAt: {
					$gte: yesterday.setHours(0, 0, 0, 0),
					$lte: yesterday.setHours(23, 59, 59, 999),
				},
			})
			.populate([
				{
					path: 'idVehiculo',
					model: 'Vehiculo',
					select: ['placa', 'modelo'],
				},
			]);
	}

	async create(dto: ResponsableDto): Promise<Responsable> {
		const user = await this.usuarioService.findOne(dto.idUsuario);
		if (!user) {
			throw new NotFoundException('El usuario no existe');
		}
		const vehicle = await this.vehiculoService.findOne(dto.idVehiculo);
		if (!vehicle) {
			throw new NotFoundException('El vehículo no existe');
		}
		const newModel = new this.responsableModel(dto);
		return await newModel.save();
	}

	async insertMany(dto: ManyResponsableDto) {
		const responsables = [];
		dto.responsables.forEach(async responsable => {
			responsables.push({
				idUsuario: responsable.idUsuario,
				idVehiculo: responsable.idVehiculo,
				ruta: responsable.ruta,
			});
		});
		return await this.responsableModel.insertMany(responsables);
	}

	async update(id: string, dto: UpdateResponsableDto): Promise<Responsable> {
		const modelActualizar = await this.responsableModel.findById(id);
		if (!modelActualizar) {
			throw new NotFoundException('El responsable no existe');
		}
		if (dto.idUsuario) {
			const user = await this.usuarioService.findOne(dto.idUsuario);
			if (!user) {
				throw new NotFoundException('El usuario no existe');
			}
		}
		if (dto.idVehiculo) {
			const vehicle = await this.vehiculoService.findOne(dto.idVehiculo);
			if (!vehicle) {
				throw new NotFoundException('El vehículo no existe');
			}
		}
		return await this.responsableModel.findByIdAndUpdate(id, dto, { new: true });
	}

	async delete(id: string): Promise<Responsable> {
		return await this.responsableModel.findByIdAndDelete(id);
	}
}
