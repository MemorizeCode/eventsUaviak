import { Module } from '@nestjs/common';
import { MaxSecretService } from './max-secret.service';
import { MaxSecretController } from './max-secret.controller';

@Module({
  controllers: [MaxSecretController],
  providers: [MaxSecretService],
})
export class MaxSecretModule {}
