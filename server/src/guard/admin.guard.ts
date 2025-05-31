import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { TokenService } from 'src/service/token.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwt: TokenService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers.authorization;
    const secretKey = request.headers['secret-key'];

    if (!headers) {
      throw new UnauthorizedException('Отсутствует токен авторизации');
    }

    const token = headers.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Неверный формат токена');
    }

    try {
      const decoded = await this.jwt.verifyAccessToken(token);
      if (!decoded || !decoded.id) {
        throw new UnauthorizedException('Неверный токен');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }

      if (user.role !== 'ADMIN') {
        throw new ForbiddenException('Недостаточно прав для доступа');
      }
      request.user = user;
      return true;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new UnauthorizedException('Ошибка проверки прав доступа');
    }
  }
}
