import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//* Schemas
import { DetalleClienteSchema } from './schemas/detalleCliente.schema';
import { DetalleEntregaSchema } from './schemas/detalleEntrega.schema';
import { DetallePedidoSchema } from './schemas/detallePedido.schema';
import { EstadoFolioSchema } from './schemas/estadoFolio.schema';
import { EvidenciaSchema } from './schemas/evidencia.schema';
import { FolioSchema } from './schemas/folio.schema';
import { FotoClienteSchema } from './schemas/fotoCliente.schema';
import { HorarioVisitaSchema } from './schemas/horarioVisita.schema';
import { LocalAbastecimientoSchema } from './schemas/localAbastecimiento.schema';
import { TipoFotoSchema } from './schemas/tipoFoto.schema';
import { UbicacionEntregaSchema } from './schemas/ubicacionEntrega.schema';
//* Controllers
import { FoliosController } from './controllers/folios/folios.controller';
import { EvidenciasController } from './controllers/evidencias/evidencias.controller';
import { EstadoFolioController } from './controllers/estado-folio/estado-folio.controller';
//* Services
import { FoliosService } from './services/folios/folios.service';
import { EvidenciasService } from './services/evidencias/evidencias.service';
import { EstadoFolioService } from './services/estado-folio/estado-folio.service';
//* Modules
import { TransportModule } from '../transport/transport.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'DetalleCliente', schema: DetalleClienteSchema },
			{ name: 'DetalleEntrega', schema: DetalleEntregaSchema },
			{ name: 'DetallePedido', schema: DetallePedidoSchema },
			{ name: 'EstadoFolio', schema: EstadoFolioSchema },
			{ name: 'Evidencia', schema: EvidenciaSchema },
			{ name: 'Folio', schema: FolioSchema },
			{ name: 'FotoCliente', schema: FotoClienteSchema },
			{ name: 'HorarioVisita', schema: HorarioVisitaSchema },
			{ name: 'LocalAbastecimiento', schema: LocalAbastecimientoSchema },
			{ name: 'TipoFoto', schema: TipoFotoSchema },
			{ name: 'UbicacionEntrega', schema: UbicacionEntregaSchema },
		]),
		TransportModule,
	],
	controllers: [FoliosController, EvidenciasController, EstadoFolioController],
	providers: [FoliosService, EvidenciasService, EstadoFolioService],
})
export class DocumentModule {}
