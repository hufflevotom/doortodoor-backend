import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//* Interfaces
import { Folio } from '../interfaces/folio.interface';
import { DetalleCliente } from '../interfaces/detalleCliente.interface';
import { DetalleEntrega } from '../interfaces/detalleEntrega.interface';
import { DetallePedido } from '../interfaces/detallePedido.interface';
import { HorarioVisita } from '../interfaces/horarioVisita.interface';
import { LocalAbastecimiento } from '../interfaces/localAbastecimiento.interface';
import { UbicacionEntrega } from '../interfaces/ubicacionEntrega.interface';
//* DTO's
import { QueryLimitDto } from 'src/common/queryLimit.dto';
import { FolioDto, UpdateFolioDto } from '../dto/folio.dto';
//* Services

@Injectable()
export class FoliosService {
	constructor(
		@InjectModel('Folio') private readonly folioModel: Model<Folio>,
		@InjectModel('DetalleCliente') private readonly detalleClienteModel: Model<DetalleCliente>,
		@InjectModel('DetalleEntrega') private readonly detalleEntregaModel: Model<DetalleEntrega>,
		@InjectModel('DetallePedido') private readonly detallePedidoModel: Model<DetallePedido>,
		@InjectModel('HorarioVisita') private readonly horarioVisitaModel: Model<HorarioVisita>,
		@InjectModel('LocalAbastecimiento')
		private readonly localAbastecimientoModel: Model<LocalAbastecimiento>,
		@InjectModel('UbicacionEntrega')
		private readonly ubicacionEntregaModel: Model<UbicacionEntrega>,
	) {}

	findAll(query: QueryLimitDto) {
		return this.folioModel
			.find()
			.sort({ updatedAt: -1 })
			.limit(query.limit)
			.skip(query.offset)
			.populate([
				{
					path: 'idDetalleCliente',
					model: 'DetalleCliente',
					select: ['nombre', 'dni', 'telefono', 'direccion'],
				},
				{
					path: 'idDetalleEntrega',
					model: 'DetalleEntrega',
					populate: [
						{
							path: 'idUbicacionEntrega',
							model: 'UbicacionEntrega',
							select: ['latitud', 'longitud', 'distrito'],
						},
						{
							path: 'idHorarioVisita',
							model: 'HorarioVisita',
							select: ['inicioVisita', 'finVisita'],
						},
					],
					select: ['fechaEntrega', 'idUbicacionEntrega', 'ordenEntrega', 'idHorarioVisita'],
				},
				{
					path: 'idDetallePedido',
					model: 'DetallePedido',
					select: ['descripcionPedido'],
				},
				{
					path: 'idLocalAbastecimiento',
					model: 'LocalAbastecimiento',
					select: ['localAbastecimiento'],
				},
			]);
		// .populate([
		// 	'idDetalleCliente',
		// 	'idDetalleEntrega',
		// 	'idDetallePedido',
		// 	'idLocalAbastecimiento',
		// ]);
	}

	async count(): Promise<number> {
		return await this.folioModel.count();
	}

	async findOne(id: string): Promise<Folio> {
		return await this.folioModel.findById(id).populate([
			{
				path: 'idDetalleCliente',
				model: 'DetalleCliente',
				select: ['nombre', 'dni', 'telefono', 'direccion'],
			},
			{
				path: 'idDetalleEntrega',
				model: 'DetalleEntrega',
				populate: [
					{
						path: 'idUbicacionEntrega',
						model: 'UbicacionEntrega',
						select: ['latitud', 'longitud', 'distrito'],
					},
					{
						path: 'idHorarioVisita',
						model: 'HorarioVisita',
						select: ['inicioVisita', 'finVisita'],
					},
				],
				select: ['fechaEntrega', 'idUbicacionEntrega', 'ordenEntrega', 'idHorarioVisita'],
			},
			{
				path: 'idDetallePedido',
				model: 'DetallePedido',
				select: ['descripcionPedido'],
			},
			{
				path: 'idLocalAbastecimiento',
				model: 'LocalAbastecimiento',
				select: ['localAbastecimiento'],
			},
		]);
		// .populate({
		// 	path: 'idDetalleCliente',
		// 	model: 'DetalleCliente',
		// 	select: ['nombre', 'dni', 'telefono', 'direccion'],
		// })
		// .populate({
		// 	path: 'idDetalleEntrega',
		// 	model: 'DetalleEntrega',
		// 	populate: [
		// 		{
		// 			path: 'idUbicacionEntrega',
		// 			model: 'UbicacionEntrega',
		// 			select: ['latitud', 'longitud', 'distrito'],
		// 		},
		// 		{
		// 			path: 'idHorarioVisita',
		// 			model: 'HorarioVisita',
		// 			select: ['inicioVisita', 'finVisita'],
		// 		},
		// 	],
		// 	select: ['fechaEntrega', 'idUbicacionEntrega', 'ordenEntrega', 'idHorarioVisita'],
		// })
		// .populate({
		// 	path: 'idDetallePedido',
		// 	model: 'DetallePedido',
		// 	select: ['descripcionPedido'],
		// })
		// .populate({
		// 	path: 'idLocalAbastecimiento',
		// 	model: 'LocalAbastecimiento',
		// 	select: ['localAbastecimiento'],
		// });
	}

	async create(dto: FolioDto): Promise<Folio> {
		const detalleCliente = await new this.detalleClienteModel(dto.idDetalleCliente).save();
		if (!detalleCliente) {
			throw new NotFoundException('El detalle de cliente no se guardó correctamente');
		}

		const ubicacionEntrega = await new this.ubicacionEntregaModel(
			dto.idDetalleEntrega.idUbicacionEntrega,
		).save();
		if (!ubicacionEntrega) {
			throw new NotFoundException('La ubicación de entrega no se guardó correctamente');
		}

		const horarioVisita = await new this.horarioVisitaModel(
			dto.idDetalleEntrega.idHorarioVisita,
		).save();
		if (!horarioVisita) {
			throw new NotFoundException('El horario de visita no se guardó correctamente');
		}

		let detalleEntrega = new this.detalleEntregaModel(dto.idDetalleEntrega);

		detalleEntrega.idUbicacionEntrega = ubicacionEntrega._id;
		detalleEntrega.idHorarioVisita = horarioVisita._id;

		detalleEntrega = await detalleEntrega.save();
		if (!detalleEntrega) {
			throw new NotFoundException('El detalle de entrega no se guardó correctamente');
		}

		const detallePedido = await new this.detallePedidoModel(dto.idDetallePedido).save();
		if (!detallePedido) {
			throw new NotFoundException('El detalle de pedido no se guardó correctamente');
		}

		const localAbastecimiento = await new this.localAbastecimientoModel(
			dto.idLocalAbastecimiento,
		).save();
		if (!localAbastecimiento) {
			throw new NotFoundException('El local de abastecimiento no se guardó correctamente');
		}

		const newModel = new this.folioModel(dto);

		newModel.idDetalleCliente = detalleCliente._id;
		newModel.idDetalleEntrega = detalleEntrega._id;
		newModel.idDetallePedido = detallePedido._id;
		newModel.idLocalAbastecimiento = localAbastecimiento._id;

		return await newModel.save();
	}

	async update(id: string, dto: UpdateFolioDto): Promise<Folio> {
		const modelActualizar = await this.folioModel.findById(id);
		if (!modelActualizar) {
			throw new NotFoundException('El vehiculo no existe');
		}

		modelActualizar.numeroFolio = dto.numeroFolio;
		modelActualizar.ruta = dto.ruta;

		if (dto.idDetalleCliente) {
			const detalleCliente = await this.detalleClienteModel.findByIdAndUpdate(
				dto.idDetalleCliente._id,
				dto.idDetalleCliente,
				{ new: true },
			);
			if (!detalleCliente) {
				throw new NotFoundException('El detalle de cliente no se guardó correctamente');
			}
			modelActualizar.idDetalleCliente = detalleCliente._id;
		}

		if (dto.idDetalleEntrega) {
			const detalleEntregaActualizar = await this.detalleEntregaModel.findById(id);
			if (!detalleEntregaActualizar) {
				throw new NotFoundException('El detalle de entrega no existe');
			}

			detalleEntregaActualizar.ordenEntrega = dto.idDetalleEntrega.ordenEntrega;

			if (dto.idDetalleEntrega.fechaEntrega)
				detalleEntregaActualizar.fechaEntrega = new Date(dto.idDetalleEntrega.fechaEntrega);

			if (dto.idDetalleEntrega.idHorarioVisita) {
				const horarioVisita = await this.horarioVisitaModel.findByIdAndUpdate(
					dto.idDetalleEntrega.idHorarioVisita._id,
					dto.idDetalleEntrega.idHorarioVisita,
					{ new: true },
				);
				if (!horarioVisita) {
					throw new NotFoundException('El horario de visita no se guardó correctamente');
				}
				detalleEntregaActualizar.idHorarioVisita = horarioVisita._id;
			}

			if (dto.idDetalleEntrega.idUbicacionEntrega) {
				const ubicacionEntrega = await this.ubicacionEntregaModel.findByIdAndUpdate(
					dto.idDetalleEntrega.idUbicacionEntrega._id,
					dto.idDetalleEntrega.idUbicacionEntrega,
					{ new: true },
				);
				if (!ubicacionEntrega) {
					throw new NotFoundException('La ubicación de entrega no se guardó correctamente');
				}
				detalleEntregaActualizar.idUbicacionEntrega = ubicacionEntrega._id;
			}

			const detalleEntrega = await this.detalleEntregaModel.findByIdAndUpdate(
				dto.idDetalleEntrega._id,
				detalleEntregaActualizar,
				{ new: true },
			);
			if (!detalleEntrega) {
				throw new NotFoundException('El detalle de entrega no se guardó correctamente');
			}
			modelActualizar.idDetalleEntrega = detalleEntrega._id;
		}

		if (dto.idDetallePedido) {
			const detallePedido = await this.detallePedidoModel.findByIdAndUpdate(
				dto.idDetallePedido._id,
				dto.idDetallePedido,
				{ new: true },
			);
			if (!detallePedido) {
				throw new NotFoundException('El detalle de pedido no se guardó correctamente');
			}
			modelActualizar.idDetallePedido = detallePedido._id;
		}

		if (dto.idLocalAbastecimiento) {
			const localAbastecimiento = await this.localAbastecimientoModel.findByIdAndUpdate(
				dto.idLocalAbastecimiento._id,
				dto.idLocalAbastecimiento,
				{ new: true },
			);
			if (!localAbastecimiento) {
				throw new NotFoundException('El local de abastecimiento no se guardó correctamente');
			}
			modelActualizar.idLocalAbastecimiento = localAbastecimiento._id;
		}

		return await this.folioModel.findByIdAndUpdate(id, modelActualizar, { new: true });
	}

	async delete(dto: FolioDto): Promise<Folio> {
		await this.detalleClienteModel.findByIdAndDelete(dto.idDetalleCliente._id);
		await this.horarioVisitaModel.findByIdAndDelete(dto.idDetalleEntrega.idHorarioVisita._id);
		await this.ubicacionEntregaModel.findByIdAndDelete(dto.idDetalleEntrega.idUbicacionEntrega._id);
		await this.detalleEntregaModel.findByIdAndDelete(dto.idDetalleEntrega._id);
		await this.detallePedidoModel.findByIdAndDelete(dto.idDetallePedido._id);
		await this.localAbastecimientoModel.findByIdAndDelete(dto.idLocalAbastecimiento._id);
		return await this.folioModel.findByIdAndDelete(dto._id);
	}

	async getRutas() {
		return await this.folioModel
			.find({
				createdAt: {
					$gte: new Date().setHours(0, 0, 0, 0),
					$lte: new Date().setHours(23, 59, 59, 999),
				},
			})
			.sort({ ruta: 1 })
			.distinct('ruta');
	}

	cargarFolios() {
		return;
	}
}
