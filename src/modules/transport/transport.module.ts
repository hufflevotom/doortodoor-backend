import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//* Schemas
import { VehiculoSchema } from './schemas/vehiculo.schema';
import { EstadoVehiculoSchema } from './schemas/estadoVehiculo.schema';
import { ResponsableSchema } from './schemas/responsable.schema';
//* Controllers
import { VehiculosController } from './controllers/vehiculos.controller';
import { ResponsablesController } from './controllers/responsables.controller';
//* Services
import { VehiculosService } from './services/vehiculos.service';
import { ResponsablesService } from './services/responsables.service';
//* Modules
import { AuthModule } from '../auth/auth.module';
import { EstadoVehiculoController } from './controllers/estado-vehiculo/estado-vehiculo.controller';
import { EstadoVehiculoService } from './services/estado-vehiculo/estado-vehiculo.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Vehiculo', schema: VehiculoSchema },
			{ name: 'EstadoVehiculo', schema: EstadoVehiculoSchema },
			{ name: 'Responsable', schema: ResponsableSchema },
		]),
		forwardRef(() => AuthModule),
	],
	controllers: [VehiculosController, ResponsablesController, EstadoVehiculoController],
	providers: [VehiculosService, ResponsablesService, EstadoVehiculoService],
	exports: [VehiculosService, ResponsablesService],
})
export class TransportModule {}
