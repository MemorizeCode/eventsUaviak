import { Test, TestingModule } from '@nestjs/testing';
import { MaxSecretService } from './max-secret.service';

describe('MaxSecretService', () => {
  let service: MaxSecretService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaxSecretService],
    }).compile();

    service = module.get<MaxSecretService>(MaxSecretService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
