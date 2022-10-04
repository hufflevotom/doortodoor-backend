import { Module } from '@nestjs/common';
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

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Vehiculo', schema: VehiculoSchema },
			{ name: 'EstadoVehiculo', schema: EstadoVehiculoSchema },
			{ name: 'Responsable', schema: ResponsableSchema },
		]),
		AuthModule,
	],
	controllers: [VehiculosController, ResponsablesController],
	providers: [VehiculosService, ResponsablesService],
	exports: [VehiculosService, ResponsablesService],
})
export class TransportModule {}
