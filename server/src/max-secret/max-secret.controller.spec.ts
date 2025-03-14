import { Test, TestingModule } from '@nestjs/testing';
import { MaxSecretController } from './max-secret.controller';
import { MaxSecretService } from './max-secret.service';

describe('MaxSecretController', () => {
  let controller: MaxSecretController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaxSecretController],
      providers: [MaxSecretService],
    }).compile();

    controller = module.get<MaxSecretController>(MaxSecretController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
