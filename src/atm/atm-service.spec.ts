import { Test, TestingModule } from '@nestjs/testing';
import { AtmService } from './atm-service';

describe('AtmService', () => {
  let provider: AtmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtmService],
    }).compile();

    provider = module.get<AtmService>(AtmService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
