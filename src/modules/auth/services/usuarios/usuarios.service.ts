import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
//* Interfaces
import { Usuario } from '../../interfaces/usuarios/usuario.interface';
//* DTO's
import { UpdateUsuarioDto, UsuarioDto, UsuarioLimitDto } from '../../dto/usuarios/usuario.dto';
//* Services
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsuariosService {
	constructor(
		@InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>,
		private rolesService: RolesService,
	) {}

	findAll(query: UsuarioLimitDto) {
		return this.usuarioModel
			.find()
			.sort({ updatedAt: -1 })
			.limit(query.limit)
			.skip(query.offset)
			.populate('idTipoRol');
	}

	findRepartidores(query: UsuarioLimitDto) {
		return this.usuarioModel
			.find({ idTipoRol: '60bb0fad68bcb70590c9eccd' })
			.sort({ updatedAt: -1 })
			.limit(query.limit)
			.skip(query.offset)
			.populate('idTipoRol');
	}

	async count(): Promise<number> {
		return await this.usuarioModel.count();
	}

	async findOne(id: string): Promise<Usuario> {
		return await this.usuarioModel.findById(id);
	}

	async findUsuarioByDocument(documento: string): Promise<Usuario> {
		return await this.usuarioModel.findOne({ documento });
	}

	async create(usuario: UsuarioDto): Promise<Usuario> {
		const usuarioExiste = await this.usuarioModel.findOne({ documento: usuario.documento });
		if (
			usuarioExiste && usuarioExiste.documento
				? usuarioExiste.documento === usuario.documento
				: false
		) {
			throw new NotFoundException('Usuario ya existe');
		}

		if (!usuario.contrasena) {
			throw new NotFoundException('Contraseña es requerida');
		}
		const hash = await bcrypt.hash(usuario.contrasena, 10);
		usuario.contrasena = hash;

		const rol = await this.rolesService.findOne(usuario.idTipoRol);
		if (!rol) {
			throw new NotFoundException('El rol no existe');
		}

		const newUsuario = new this.usuarioModel(usuario);
		return await newUsuario.save();
	}

	async update(id: string, usuario: UpdateUsuarioDto): Promise<Usuario> {
		const usuarioActualizar = await this.usuarioModel.findById(id);
		if (!usuarioActualizar) {
			throw new NotFoundException('El usuario no existe');
		}
		if (usuario.idTipoRol) {
			const rol = await this.rolesService.findOne(usuario.idTipoRol);
			if (!rol) {
				throw new NotFoundException('El rol no existe');
			}
			usuario.idTipoRol = usuario.idTipoRol;
		}

		if (!usuario.contrasena) {
			throw new NotFoundException('Contraseña es requerida');
		}
		const hash = await bcrypt.hash(usuario.contrasena, 10);
		usuario.contrasena = hash;

		return await this.usuarioModel.findByIdAndUpdate(id, usuario, { new: true });
	}

	async delete(id: string): Promise<Usuario> {
		return await this.usuarioModel.findByIdAndDelete(id);
	}

	async login(documento: string, contrasena: string) {
		const usuario = await this.usuarioModel.findOne({ documento });
		if (!usuario) {
			throw new NotFoundException('Usuario no existe');
		}
		const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
		if (!isMatch) {
			throw new NotFoundException('Contraseña incorrecta');
		}
		return usuario;
	}
}
