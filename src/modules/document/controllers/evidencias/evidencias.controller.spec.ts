import { Test, TestingModule } from '@nestjs/testing';
import { EvidenciasController } from './evidencias.controller';

describe('EvidenciasController', () => {
	let controller: EvidenciasController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [EvidenciasController],
		}).compile();

		controller = module.get<EvidenciasController>(EvidenciasController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
