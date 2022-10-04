import { Test, TestingModule } from '@nestjs/testing';
import { EvidenciasService } from './evidencias.service';

describe('EvidenciasService', () => {
	let service: EvidenciasService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [EvidenciasService],
		}).compile();

		service = module.get<EvidenciasService>(EvidenciasService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
