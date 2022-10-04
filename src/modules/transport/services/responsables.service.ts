import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//* Interfaces
import { Responsable } from '../interfaces/responsable.interface';
//* DTO's
import { ResponsableDto, UpdateResponsableDto } from '../dto/responsable.dto';
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

	async findOne(id: string): Promise<Responsable> {
		return await this.responsableModel.findById(id);
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
			dto.idUsuario = dto.idUsuario;
		}
		if (dto.idVehiculo) {
			const vehicle = await this.vehiculoService.findOne(dto.idVehiculo);
			if (!vehicle) {
				throw new NotFoundException('El vehículo no existe');
			}
			dto.idVehiculo = dto.idVehiculo;
		}
		return await this.responsableModel.findByIdAndUpdate(id, dto, { new: true });
	}

	async delete(id: string): Promise<Responsable> {
		return await this.responsableModel.findByIdAndDelete(id);
	}
}
