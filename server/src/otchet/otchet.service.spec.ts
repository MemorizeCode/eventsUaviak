import { Test, TestingModule } from '@nestjs/testing';
import { OtchetService } from './otchet.service';

describe('OtchetService', () => {
  let service: OtchetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtchetService],
    }).compile();

    service = module.get<OtchetService>(OtchetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
