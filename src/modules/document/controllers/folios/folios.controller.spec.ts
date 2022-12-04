import { Test, TestingModule } from '@nestjs/testing';
import { FoliosController } from './folios.controller';

describe('FoliosController', () => {
	let controller: FoliosController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FoliosController],
		}).compile();

		controller = module.get<FoliosController>(FoliosController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
