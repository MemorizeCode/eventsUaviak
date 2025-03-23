import { Module } from '@nestjs/common';
import { OtchetService } from './otchet.service';
import { OtchetController } from './otchet.controller';
import { PrismaService } from 'src/service/prisma.service';

@Module({
  controllers: [OtchetController],
  providers: [OtchetService, PrismaService],
  exports: [PrismaService],
})
export class OtchetModule {}
