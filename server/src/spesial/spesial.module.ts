import { Module } from '@nestjs/common';
import { SpesialService } from './spesial.service';
import { SpesialController } from './spesial.controller';
import { PrismaService } from 'src/service/prisma.service';
import { TokenService } from 'src/service/token.service';

@Module({
  controllers: [SpesialController],
  providers: [SpesialService, PrismaService, TokenService],
  exports: [PrismaService, TokenService],
})
export class SpesialModule {}
