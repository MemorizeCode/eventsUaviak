import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaService } from 'src/service/prisma.service';
import { TokenService } from 'src/service/token.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, PrismaService, TokenService],
  exports: [PrismaService, TokenService],
})
export class EventsModule {}
