import { Test, TestingModule } from '@nestjs/testing';
import { AtmControllerController } from './atm-controller.controller';

describe('AtmControllerController', () => {
  let controller: AtmControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtmControllerController],
    }).compile();

    controller = module.get<AtmControllerController>(AtmControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
