import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { PrismaService } from 'src/service/prisma.service';
import { TokenService } from 'src/service/token.service';

@Module({
  controllers: [RecordController],
  providers: [RecordService, PrismaService, TokenService],
  exports: [PrismaService, TokenService],
})
export class RecordModule {}
