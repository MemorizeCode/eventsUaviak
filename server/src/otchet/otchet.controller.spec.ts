import { Test, TestingModule } from '@nestjs/testing';
import { OtchetController } from './otchet.controller';
import { OtchetService } from './otchet.service';

describe('OtchetController', () => {
  let controller: OtchetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtchetController],
      providers: [OtchetService],
    }).compile();

    controller = module.get<OtchetController>(OtchetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
