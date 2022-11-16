import { Test, TestingModule } from '@nestjs/testing';
import { EstadoVehiculoController } from './estado-vehiculo.controller';

describe('EstadoVehiculoController', () => {
  let controller: EstadoVehiculoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoVehiculoController],
    }).compile();

    controller = module.get<EstadoVehiculoController>(EstadoVehiculoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
