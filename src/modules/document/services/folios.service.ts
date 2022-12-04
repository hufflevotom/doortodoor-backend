import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
//* Interfaces
import { Folio } from '../interfaces/folio.interface';
import { DetalleCliente } from '../interfaces/detalleCliente.interface';
import { DetalleEntrega } from '../interfaces/detalleEntrega.interface';
import { DetallePedido } from '../interfaces/detallePedido.interface';
import { HorarioVisita } from '../interfaces/horarioVisita.interface';
import { LocalAbastecimiento } from '../interfaces/localAbastecimiento.interface';
import { UbicacionEntrega } from '../interfaces/ubicacionEntrega.interface';
//* DTO's
import { FolioDto, FolioQueryLimitDto, ManyFoliosDto, UpdateFolioDto } from '../dto/folio.dto';
import { ResponsablesService } from 'src/modules/transport/services/responsables.service';
//* Services

@Injectable()
export class FoliosService {
	constructor(
		private responsableService: ResponsablesService,
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

	async findAll(query: FolioQueryLimitDto) {
		let data = [];
		let total = 0;
		const populate = [
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
		];
		if (query.criterio === 'numeroFolio') {
			const numerosFolio = await this.folioModel
				.find({ numeroFolio: query.busqueda })
				.select('_id');
			data = await this.folioModel
				.find({ numeroFolio: query.busqueda })
				.sort({ createdAt: -1 })
				.limit(query.limit)
				.skip(query.offset)
				.populate(populate);
			total = numerosFolio.length;
		} else if (query.criterio === 'dni') {
			const dnis = await this.detalleClienteModel.find({ dni: query.busqueda }).select('_id');
			data = await this.folioModel
				.find({ idDetalleCliente: dnis })
				.sort({ createdAt: -1 })
				.limit(query.limit)
				.skip(query.offset)
				.populate(populate);
			total = dnis.length;
		} else if (query.criterio === 'telefono') {
			const telefonos = await this.detalleClienteModel
				.find({ telefono: query.busqueda })
				.select('_id');
			data = await this.folioModel
				.find({ idDetalleCliente: telefonos })
				.sort({ createdAt: -1 })
				.limit(query.limit)
				.skip(query.offset)
				.populate(populate);
			total = telefonos.length;
		} else if (query.criterio === 'fechaEntrega') {
			const fechas = await this.detalleEntregaModel
				.find({ fechaEntrega: query.busqueda })
				.select('_id');
			data = await this.folioModel
				.find({ idDetalleEntrega: fechas })
				.sort({ createdAt: -1 })
				.limit(query.limit)
				.skip(query.offset)
				.populate(populate);
			total = fechas.length;
		} else {
			data = await this.folioModel
				.find()
				.sort({ createdAt: -1 })
				.limit(query.limit)
				.skip(query.offset)
				.populate(populate);
			total = await this.folioModel.count();
		}
		return { data, total };
	}

	async findByRuta(ruta: string) {
		const populate = [
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
		];
		const today = new Date();
		const dateParsed = today
			.toLocaleDateString('es-PE', { timeZone: 'America/Lima' })
			.split('/')
			.reverse();
		dateParsed[1] = dateParsed[1].padStart(2, '0');
		dateParsed[2] = dateParsed[2].padStart(2, '0');
		const fechaActual = await this.detalleEntregaModel
			.find({
				fechaEntrega: {
					$gte: new Date(`${dateParsed.join('-')}T00:00:00.000Z`),
					$lte: new Date(`${dateParsed.join('-')}T23:59:59.999Z`),
				},
			})
			.select(['_id', 'ordenEntrega'])
			.sort({ ordenEntrega: 1 });
		const resp = await this.folioModel
			.find({ ruta: ruta, idDetalleEntrega: fechaActual })
			.populate(populate);
		return resp;
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

		// detalleEntrega.fechaEntrega = new Date(dto.idDetalleEntrega.fechaEntrega);
		detalleEntrega.idUbicacionEntrega = ubicacionEntrega;
		detalleEntrega.idHorarioVisita = horarioVisita;

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

		newModel.idDetalleCliente = detalleCliente;
		newModel.idDetalleEntrega = detalleEntrega;
		newModel.idDetallePedido = detallePedido;
		newModel.idLocalAbastecimiento = localAbastecimiento;

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
				modelActualizar.idDetalleCliente,
				dto.idDetalleCliente,
				{ new: true },
			);
			if (!detalleCliente) {
				throw new NotFoundException('El detalle de cliente no se guardó correctamente');
			}
			modelActualizar.idDetalleCliente = detalleCliente;
		}

		if (dto.idDetalleEntrega) {
			const detalleEntregaActualizar = await this.detalleEntregaModel.findById(
				modelActualizar.idDetalleEntrega,
			);
			if (!detalleEntregaActualizar) {
				throw new NotFoundException('El detalle de entrega no existe');
			}

			detalleEntregaActualizar.ordenEntrega = dto.idDetalleEntrega.ordenEntrega;

			// if (dto.idDetalleEntrega.fechaEntrega)
			// detalleEntregaActualizar.fechaEntrega = new Date(dto.idDetalleEntrega.fechaEntrega);

			if (dto.idDetalleEntrega.idHorarioVisita) {
				const horarioVisita = await this.horarioVisitaModel.findByIdAndUpdate(
					detalleEntregaActualizar.idHorarioVisita,
					dto.idDetalleEntrega.idHorarioVisita,
					{ new: true },
				);
				if (!horarioVisita) {
					throw new NotFoundException('El horario de visita no se guardó correctamente');
				}
				detalleEntregaActualizar.idHorarioVisita = horarioVisita;
			}

			if (dto.idDetalleEntrega.idUbicacionEntrega) {
				const ubicacionEntrega = await this.ubicacionEntregaModel.findByIdAndUpdate(
					detalleEntregaActualizar.idUbicacionEntrega,
					dto.idDetalleEntrega.idUbicacionEntrega,
					{ new: true },
				);
				if (!ubicacionEntrega) {
					throw new NotFoundException('La ubicación de entrega no se guardó correctamente');
				}
				detalleEntregaActualizar.idUbicacionEntrega = ubicacionEntrega;
			}

			const detalleEntrega = await this.detalleEntregaModel.findByIdAndUpdate(
				modelActualizar.idDetalleEntrega,
				detalleEntregaActualizar,
				{ new: true },
			);
			if (!detalleEntrega) {
				throw new NotFoundException('El detalle de entrega no se guardó correctamente');
			}
			// if (dto.idDetalleEntrega.fechaEntrega)
			// detalleEntrega.fechaEntrega = new Date(dto.idDetalleEntrega.fechaEntrega);
			modelActualizar.idDetalleEntrega = detalleEntrega;
		}

		if (dto.idDetallePedido) {
			const detallePedido = await this.detallePedidoModel.findByIdAndUpdate(
				modelActualizar.idDetallePedido,
				dto.idDetallePedido,
				{ new: true },
			);
			if (!detallePedido) {
				throw new NotFoundException('El detalle de pedido no se guardó correctamente');
			}
			modelActualizar.idDetallePedido = detallePedido;
		}

		if (dto.idLocalAbastecimiento) {
			const localAbastecimiento = await this.localAbastecimientoModel.findByIdAndUpdate(
				modelActualizar.idLocalAbastecimiento,
				dto.idLocalAbastecimiento,
				{ new: true },
			);
			if (!localAbastecimiento) {
				throw new NotFoundException('El local de abastecimiento no se guardó correctamente');
			}
			modelActualizar.idLocalAbastecimiento = localAbastecimiento;
		}

		return await this.folioModel.findByIdAndUpdate(id, modelActualizar, { new: true });
	}

	async delete(id: string): Promise<Folio> {
		const modelEliminar = await this.folioModel.findById(id);
		await this.detalleClienteModel.findByIdAndDelete(modelEliminar.idDetalleCliente);
		const detalleEliminar = await this.detalleEntregaModel.findById(modelEliminar.idDetalleEntrega);
		await this.horarioVisitaModel.findByIdAndDelete(detalleEliminar.idHorarioVisita);
		await this.ubicacionEntregaModel.findByIdAndDelete(detalleEliminar.idUbicacionEntrega);
		await this.detalleEntregaModel.findByIdAndDelete(modelEliminar.idDetalleEntrega);
		await this.detallePedidoModel.findByIdAndDelete(modelEliminar.idDetallePedido);
		await this.localAbastecimientoModel.findByIdAndDelete(modelEliminar.idLocalAbastecimiento);
		return await this.folioModel.findByIdAndDelete(id);
	}

	async getRutas() {
		return await this.folioModel
			.find(
				{
					createdAt: {
						$gte: new Date().setHours(0, 0, 0, 0),
						$lte: new Date().setHours(23, 59, 59, 999),
					},
				},
				{ ruta: 1 },
			)
			.sort({ ruta: 1 })
			.distinct('ruta');
	}

	async validarEstadoCarga() {
		const rutas = await this.getRutas();
		const responsables = await this.responsableService.getResponsablesDia();
		if (responsables.length > 0) {
			return 2;
		} else if (rutas.length > 0) {
			return 1;
		}
		return 0;
	}

	async insertMany(dto: ManyFoliosDto) {
		const clientes = [];
		const ubicaciones = [];
		const horarios = [];
		const pedidos = [];
		const locales = [];
		const entregas = [];
		const folios = [];
		dto.name.forEach(folioActual => {
			const idDetalleCliente = new Types.ObjectId();
			const idUbicacionEntrega = new Types.ObjectId();
			const idHorarioVisita = new Types.ObjectId();
			const idDetalleEntrega = new Types.ObjectId();
			const idDetallePedido = new Types.ObjectId();
			const idLocalAbastecimiento = new Types.ObjectId();
			clientes.push({
				_id: `${idDetalleCliente}`,
				nombre: `${folioActual.Descripcion}`,
				dni: `${folioActual.Dni}`,
				telefono: `${folioActual.Telefono}`,
				direccion: `${folioActual.Direccion}`,
			});
			ubicaciones.push({
				_id: `${idUbicacionEntrega}`,
				latitud: `${folioActual.Latitud}`,
				longitud: `${folioActual.Longitud}`,
				distrito: `${folioActual.Localidad}`,
			});
			horarios.push({
				_id: `${idHorarioVisita}`,
				inicioVisita: `${folioActual.InicioVisita}`,
				finVisita: `${folioActual.FinVisita}`,
			});
			pedidos.push({
				_id: `${idDetallePedido}`,
				descripcionPedido: `${folioActual.Producto}`,
			});
			locales.push({
				_id: `${idLocalAbastecimiento}`,
				localAbastecimiento: `${folioActual.LocalAbastece}`,
			});
			entregas.push({
				_id: `${idDetalleEntrega}`,
				fechaEntrega: `${folioActual.FechaPactada}`,
				idUbicacionEntrega: `${idUbicacionEntrega}`,
				ordenEntrega: `${folioActual.Orden}`,
				idHorarioVisita: `${idHorarioVisita}`,
			});
			folios.push({
				numeroFolio: `${folioActual.Folio}`,
				ruta: `${folioActual.IdRuta}`,
				idDetalleCliente: `${idDetalleCliente}`,
				idDetalleEntrega: `${idDetalleEntrega}`,
				idDetallePedido: `${idDetallePedido}`,
				idLocalAbastecimiento: `${idLocalAbastecimiento}`,
			});
		});

		await this.detalleClienteModel.insertMany(clientes);
		await this.ubicacionEntregaModel.insertMany(ubicaciones);
		await this.horarioVisitaModel.insertMany(horarios);
		await this.detallePedidoModel.insertMany(pedidos);
		await this.localAbastecimientoModel.insertMany(locales);
		await this.detalleEntregaModel.insertMany(entregas);

		return await this.folioModel.insertMany(folios);
	}
}
