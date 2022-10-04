import { Test, TestingModule } from '@nestjs/testing';
import { ResponsablesService } from './responsables.service';

describe('ResponsablesService', () => {
	let service: ResponsablesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ResponsablesService],
		}).compile();

		service = module.get<ResponsablesService>(ResponsablesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
