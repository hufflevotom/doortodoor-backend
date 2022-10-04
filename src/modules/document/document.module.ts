import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//* Schemas
import { DetalleClienteSchema } from './schemas/detalleCliente.schema';
import { DetalleEntregaSchema } from './schemas/detalleEntrega.schema';
import { DetallePedidoSchema } from './schemas/detallePedido.schema';
import { EstadoEvidenciaSchema } from './schemas/estadoEvidencia.schema';
import { FolioSchema } from './schemas/folio.schema';
import { FotoClienteSchema } from './schemas/fotoCliente.schema';
import { HorarioVisitaSchema } from './schemas/horarioVisita.schema';
import { LocalAbastecimientoSchema } from './schemas/localAbastecimiento.schema';
import { TipoFotoSchema } from './schemas/tipoFoto.schema';
import { UbicacionEntregaSchema } from './schemas/ubicacionEntrega.schema';
//* Controllers
import { FoliosController } from './controllers/folios.controller';
import { EvidenciasController } from './controllers/evidencias.controller';
//* Services
import { FoliosService } from './services/folios.service';
import { EvidenciasService } from './services/evidencias.service';
//* Modules

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'DetalleCliente', schema: DetalleClienteSchema },
			{ name: 'DetalleEntrega', schema: DetalleEntregaSchema },
			{ name: 'DetallePedido', schema: DetallePedidoSchema },
			{ name: 'EstadoEvidencia', schema: EstadoEvidenciaSchema },
			{ name: 'Evidencia', schema: EstadoEvidenciaSchema },
			{ name: 'Folio', schema: FolioSchema },
			{ name: 'FotoCliente', schema: FotoClienteSchema },
			{ name: 'HorarioVisita', schema: HorarioVisitaSchema },
			{ name: 'LocalAbastecimiento', schema: LocalAbastecimientoSchema },
			{ name: 'TipoFoto', schema: TipoFotoSchema },
			{ name: 'UbicacionEntrega', schema: UbicacionEntregaSchema },
		]),
	],
	controllers: [FoliosController, EvidenciasController],
	providers: [FoliosService, EvidenciasService],
})
export class DocumentModule {}
