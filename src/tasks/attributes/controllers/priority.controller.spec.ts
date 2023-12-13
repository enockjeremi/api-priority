import { Test, TestingModule } from '@nestjs/testing';
import { PriorityController } from './priority.controller';

describe('PriorityController', () => {
  let controller: PriorityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriorityController],
    }).compile();

    controller = module.get<PriorityController>(PriorityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
