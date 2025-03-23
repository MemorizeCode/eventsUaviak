import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/service/prisma.service';
import { TokenService } from 'src/service/token.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, TokenService],
  exports: [PrismaService, TokenService],
})
export class AuthModule {}
