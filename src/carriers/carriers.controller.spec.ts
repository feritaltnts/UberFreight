import { Test, TestingModule } from '@nestjs/testing';
import { CarriersController } from './carriers.controller';

describe('CarriersController', () => {
  let controller: CarriersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarriersController],
    }).compile();

    controller = module.get<CarriersController>(CarriersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
