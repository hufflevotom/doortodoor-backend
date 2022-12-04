import { Test, TestingModule } from '@nestjs/testing';
import { EstadoFolioController } from './estado-folio.controller';

describe('EstadoFolioController', () => {
  let controller: EstadoFolioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoFolioController],
    }).compile();

    controller = module.get<EstadoFolioController>(EstadoFolioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
