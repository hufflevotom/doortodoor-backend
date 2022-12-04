import { Test, TestingModule } from '@nestjs/testing';
import { FoliosService } from './folios.service';

describe('FoliosService', () => {
	let service: FoliosService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FoliosService],
		}).compile();

		service = module.get<FoliosService>(FoliosService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
