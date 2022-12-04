import { Test, TestingModule } from '@nestjs/testing';
import { EstadoFolioService } from './estado-folio.service';

describe('EstadoFolioService', () => {
  let service: EstadoFolioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoFolioService],
    }).compile();

    service = module.get<EstadoFolioService>(EstadoFolioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
