import { Test, TestingModule } from '@nestjs/testing';
import { EstadoVehiculoService } from './estado-vehiculo.service';

describe('EstadoVehiculoService', () => {
  let service: EstadoVehiculoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoVehiculoService],
    }).compile();

    service = module.get<EstadoVehiculoService>(EstadoVehiculoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
