import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//* Interfaces
import { TipoRol } from '../../interfaces/roles/roles.interface';
//* DTO's
import { RolesDto, RolesLimitDto, UpdateRolesDto } from '../../dto/roles/roles.dto';

@Injectable()
export class RolesService {
	constructor(@InjectModel('TipoRol') private readonly rolesModel: Model<TipoRol>) {}

	findAll(query: RolesLimitDto) {
		return this.rolesModel.find().sort({ updatedAt: -1 }).limit(query.limit).skip(query.offset);
	}

	async count(): Promise<number> {
		return await this.rolesModel.count();
	}

	async findOne(id: string): Promise<TipoRol> {
		return await this.rolesModel.findById(id);
	}

	async create(rol: RolesDto): Promise<TipoRol> {
		const newRol = new this.rolesModel(rol);
		return await newRol.save();
	}

	async update(id: string, rol: UpdateRolesDto): Promise<TipoRol> {
		const rolActualizar = await this.rolesModel.findById(id);
		if (!rolActualizar) {
			throw new NotFoundException('El rol no existe');
		}
		return this.rolesModel.findByIdAndUpdate(id, rol, { new: true });
	}

	async delete(id: string): Promise<TipoRol> {
		return await this.rolesModel.findByIdAndDelete(id);
	}
}
