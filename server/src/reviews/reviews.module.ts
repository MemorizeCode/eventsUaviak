import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaService } from 'src/service/prisma.service';
import { TokenService } from 'src/service/token.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService, TokenService],
  exports: [PrismaService, TokenService],
})
export class ReviewsModule {}
