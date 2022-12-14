import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//* Interfaces
import { Evidencia } from '../../interfaces/evidencia.interface';
import { FotoCliente } from '../../interfaces/fotoCliente.interface';
//* Services
import { ResponsablesService } from 'src/modules/transport/services/responsables.service';
import { EstadoFolioService } from '../estado-folio/estado-folio.service';
import { FoliosService } from '../folios/folios.service';
//* DTO's
import { QueryLimitDto } from 'src/common/queryLimit.dto';
import {
	EvidenciaDto,
	ReportadoDto,
	SearchEvidenceDto,
	UpdateEvidenciaDto,
} from '../../dto/evidencia/evidencia.dto';

@Injectable()
export class EvidenciasService {
	constructor(
		private foliosService: FoliosService,
		private responsableService: ResponsablesService,
		private estadoFolioService: EstadoFolioService,
		@InjectModel('Evidencia') private readonly evidenciaModel: Model<Evidencia>,
		@InjectModel('FotoCliente') private readonly fotoClienteModel: Model<FotoCliente>,
	) {}

	findAll(query: QueryLimitDto) {
		return this.evidenciaModel.find().sort({ updatedAt: -1 }).limit(query.limit).skip(query.offset);
	}

	async count(): Promise<number> {
		return await this.evidenciaModel.count();
	}

	findAllByFolio(id: string) {
		const populate = [
			{
				path: 'idFolio',
				model: 'Folio',
				select: [
					'numeroFolio',
					'idDetalleCliente',
					'idDetalleEntrega',
					'idDetallePedido',
					'idLocalAbastecimiento',
					'idEstado',
				],
			},
			{
				path: 'idResponsable',
				model: 'Responsable',
				select: ['idUsuario', 'idVehiculo', 'ruta'],
			},
			{
				path: 'idEstadoEvidencia',
				model: 'EstadoFolio',
				select: ['descripcion'],
			},
		];
		return this.evidenciaModel.find({ idFolio: id }).sort({ updatedAt: -1 }).populate(populate);
	}

	async findOne(id: string): Promise<Evidencia> {
		return await this.evidenciaModel.findOne({ _id: id });
	}

	async findOneByFolioAndResponsable(query: SearchEvidenceDto) {
		const evidence = await this.evidenciaModel
			.findOne({
				idFolio: query.idFolio,
				idResponsable: query.idResponsable,
			})
			.populate([
				{
					path: 'idEstadoEvidencia',
					model: 'EstadoFolio',
					select: ['descripcion'],
				},
			]);

		if (!evidence) {
			throw new NotFoundException('No se encontr?? evidencia');
		}

		const images = await this.fotoClienteModel
			.find({
				idEvidencia: evidence._id,
			})
			.populate([
				{
					path: 'idTipoFoto',
					model: 'TipoFoto',
					select: ['descripcion'],
				},
			]);

		return { evidence, images };
	}

	async create(dto: EvidenciaDto): Promise<Evidencia> {
		const newModel = new this.evidenciaModel(dto);
		const responsable = await this.responsableService.findOne(dto.idResponsable);
		if (!responsable) {
			throw new NotFoundException('Responsable no encontrado');
		}
		newModel.idResponsable = dto.idResponsable;
		const estadoFolio = await this.estadoFolioService.findOne(dto.idEstado);
		if (!estadoFolio) {
			throw new NotFoundException('Estado de folio no encontrado');
		}
		newModel.idEstadoEvidencia = dto.idEstado;
		const folio = await this.foliosService.findOne(dto.idFolio);
		if (!folio) {
			throw new NotFoundException('Folio no encontrado');
		}
		newModel.idFolio = dto.idFolio;

		if (dto.justificacion) {
			newModel.justificacion = dto.justificacion;
		}
		if (dto.latitudFinal) {
			newModel.latitudFinal = dto.latitudFinal;
		}
		if (dto.longitudFinal) {
			newModel.longitudFinal = dto.longitudFinal;
		}

		const evidencia = await newModel.save();
		if (dto.imagenes) {
			dto.imagenes.forEach(async element => {
				const newFoto = new this.fotoClienteModel(element);
				newFoto.idTipoFoto = element.idTipoFoto;
				newFoto.urlFoto = element.urlFoto;
				newFoto.idEvidencia = evidencia._id;
				await newFoto.save();
			});
		}
		await this.foliosService.updateEstadoFolio(dto.idFolio, dto.idEstado);
		return evidencia;
	}

	async createReporte(dto: ReportadoDto): Promise<Evidencia> {
		const idReportado = '638d97194d8439da75e1566d';
		const newModel = new this.evidenciaModel(dto);
		const responsable = await this.responsableService.findOne(dto.idResponsable);
		if (!responsable) {
			throw new NotFoundException('Responsable no encontrado');
		}
		newModel.idResponsable = dto.idResponsable;
		newModel.idEstadoEvidencia = idReportado;
		const folio = await this.foliosService.findOne(dto.idFolio);
		if (!folio) {
			throw new NotFoundException('Folio no encontrado');
		}
		newModel.idFolio = dto.idFolio;

		if (dto.justificacion) {
			newModel.justificacion = dto.justificacion;
		}

		const evidencia = await newModel.save();
		await this.foliosService.updateEstadoFolio(dto.idFolio, idReportado);
		return evidencia;
	}

	async update(id: string, dto: UpdateEvidenciaDto): Promise<Evidencia> {
		const model = await this.evidenciaModel.findById(id);
		if (!model) {
			throw new NotFoundException('La evidencia no existe');
		}
		if (dto.idResponsable) {
			const responsable = await this.responsableService.findOne(dto.idResponsable);
			if (!responsable) {
				throw new NotFoundException('Responsable no encontrado');
			}
			model.idResponsable = dto.idResponsable;
		}
		if (dto.idEstado) {
			const estadoFolio = await this.estadoFolioService.findOne(dto.idEstado);
			if (!estadoFolio) {
				throw new NotFoundException('Estado de folio no encontrado');
			}
			model.idEstadoEvidencia = dto.idEstado;
		}
		if (dto.idFolio) {
			const folio = await this.foliosService.findOne(dto.idFolio);
			if (!folio) {
				throw new NotFoundException('Folio no encontrado');
			}
			model.idFolio = dto.idFolio;
		}

		if (dto.justificacion) {
			model.justificacion = dto.justificacion;
		}
		if (dto.latitudFinal) {
			model.latitudFinal = dto.latitudFinal;
		}
		if (dto.longitudFinal) {
			model.longitudFinal = dto.longitudFinal;
		}

		if (dto.idFolio && dto.idEstado) {
			await this.foliosService.updateEstadoFolio(dto.idFolio, dto.idEstado);
		}

		return this.evidenciaModel.findByIdAndUpdate(id, model, { new: true });
	}

	async delete(id: string): Promise<Evidencia> {
		return await this.evidenciaModel.findByIdAndDelete(id);
	}
}
