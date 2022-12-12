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
import { QueryLimitDto } from 'src/common/queryLimit.dto';

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

	async findByDate(query: QueryLimitDto, fecha: string) {
		const yesterday = new Date(new Date().setDate(new Date(fecha).getDate() - 1));
		const dateParsed = yesterday
			.toLocaleDateString('es-PE', { timeZone: 'America/Lima' })
			.split('/')
			.reverse();
		dateParsed[1] = dateParsed[1].padStart(2, '0');
		dateParsed[2] = dateParsed[2].padStart(2, '0');
		if (query.busqueda) {
			const dnis = await this.usuarioService.findRepartidoresByName(query.busqueda).select('_id');
			return await this.responsableModel
				.find({
					idUsuario: { $in: dnis },
					createdAt: {
						$gte: new Date(`${dateParsed.join('-')}T00:00:00.000Z`),
						$lte: new Date(`${dateParsed.join('-')}T23:59:59.999Z`),
					},
				})
				.sort({ updatedAt: -1 })
				.limit(query.limit)
				.skip(query.offset)
				.populate([
					{
						path: 'idVehiculo',
						model: 'Vehiculo',
						select: ['placa', 'marca', 'color', 'modelo'],
					},
					{
						path: 'idUsuario',
						model: 'Usuario',
						select: ['documento', 'nombre', 'apellidos', 'celular'],
					},
				]);
		}
		return await this.responsableModel
			.find({
				createdAt: {
					$gte: new Date(`${dateParsed.join('-')}T00:00:00.000Z`),
					$lte: new Date(`${dateParsed.join('-')}T23:59:59.999Z`),
				},
			})
			.sort({ updatedAt: -1 })
			.limit(query.limit)
			.skip(query.offset)
			.populate([
				{
					path: 'idVehiculo',
					model: 'Vehiculo',
					select: ['placa', 'marca', 'color', 'modelo'],
				},
				{
					path: 'idUsuario',
					model: 'Usuario',
					select: ['documento', 'nombre', 'apellidos', 'celular'],
				},
			]);
	}

	async findOne(id: string): Promise<Responsable> {
		return await this.responsableModel.findById(id).populate([
			{
				path: 'idVehiculo',
				model: 'Vehiculo',
				select: ['placa', 'marca', 'color', 'modelo'],
			},
			{
				path: 'idUsuario',
				model: 'Usuario',
				select: ['documento', 'nombre', 'apellidos', 'celular'],
			},
		]);
	}

	async findByUser(idUsuario: string) {
		const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
		const dateParsed = yesterday
			.toLocaleDateString('es-PE', { timeZone: 'America/Lima' })
			.split('/')
			.reverse();
		dateParsed[1] = dateParsed[1].padStart(2, '0');
		dateParsed[2] = dateParsed[2].padStart(2, '0');
		return await this.responsableModel
			.findOne({
				idUsuario,
				createdAt: {
					$gte: new Date(`${dateParsed.join('-')}T00:00:00.000Z`),
					$lte: new Date(`${dateParsed.join('-')}T23:59:59.999Z`),
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
		newModel.createdAt = new Date();
		newModel.updatedAt = new Date();
		return await newModel.save();
	}

	async insertMany(dto: ManyResponsableDto) {
		const responsables = [];
		dto.responsables.forEach(async responsable => {
			responsables.push({
				idUsuario: responsable.idUsuario,
				idVehiculo: responsable.idVehiculo,
				ruta: responsable.ruta,
				createdAt: new Date(),
				updatedAt: new Date(),
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
			modelActualizar.idUsuario = dto.idUsuario;
		}
		if (dto.idVehiculo) {
			const vehicle = await this.vehiculoService.findOne(dto.idVehiculo);
			if (!vehicle) {
				throw new NotFoundException('El vehículo no existe');
			}
			modelActualizar.idVehiculo = dto.idVehiculo;
		}
		modelActualizar.createdAt = new Date();
		modelActualizar.updatedAt = new Date();
		return await this.responsableModel.findByIdAndUpdate(id, modelActualizar, { new: true });
	}

	async delete(id: string): Promise<Responsable> {
		return await this.responsableModel.findByIdAndDelete(id);
	}
}
