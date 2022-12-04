import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryLimitDto } from 'src/common/queryLimit.dto';
import { EstadoFolioDto, UpdateEstadoFolioDto } from '../../dto/estado-folio/estadoFolio.dto';
import { EstadoFolio } from '../../interfaces/estadoFolio.interface';

@Injectable()
export class EstadoFolioService {
	constructor(@InjectModel('EstadoFolio') private readonly estadoFolioModel: Model<EstadoFolio>) {}

	findAll(query: QueryLimitDto) {
		return this.estadoFolioModel
			.find()
			.sort({ updatedAt: -1 })
			.limit(query.limit)
			.skip(query.offset);
	}

	async count(): Promise<number> {
		return await this.estadoFolioModel.count();
	}

	async findOne(id: string): Promise<EstadoFolio> {
		return await this.estadoFolioModel.findOne({ _id: id });
	}

	async create(dto: EstadoFolioDto): Promise<EstadoFolio> {
		const newModel = new this.estadoFolioModel(dto);
		return await newModel.save();
	}

	async update(id: string, dto: UpdateEstadoFolioDto): Promise<EstadoFolio> {
		const model = await this.estadoFolioModel.findById(id);
		if (!model) {
			throw new NotFoundException('El estado no existe');
		}
		model.descripcion = dto.descripcion;
		return this.estadoFolioModel.findByIdAndUpdate(id, model, { new: true });
	}

	async delete(id: string): Promise<EstadoFolio> {
		return await this.estadoFolioModel.findByIdAndDelete(id);
	}
}
