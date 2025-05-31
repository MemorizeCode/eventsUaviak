import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import * as bcrypt from 'bcryptjs';
import { TokenService } from 'src/service/token.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: TokenService,
  ) {}

  async login(login: string, password: string, keys) {
    try {

      if (!login || typeof login !== 'string') {
        throw new BadRequestException('Логин обязателен');
      }

      if (!password || typeof password !== 'string') {
        throw new BadRequestException('Пароль обязателен');
      }

      if (login.length < 6 || password.length < 6) {
        throw new BadRequestException(
          'Логин и пароль должны быть больше 6 символов',
        );
      }

      const user = await this.prisma.user.findUnique({
        where: { login: login.trim() },
      });

      if (!user) {
        throw new UnauthorizedException('Неверный логин');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Неверный пароль');
      }

      const payload = { id: user.id, login: user.login };
      const [accessToken, refreshToken] = await Promise.all([
        this.jwt.generateAccessToken(payload),
        this.jwt.generateRefreshToken(payload),
      ]);

      if (user.role !== 'ADMIN') {
        throw new UnauthorizedException('Вы не являетесь администратором');
      }

      return {
        message: 'Авторизация успешна',
        accessToken,
        refreshToken,
        role: user.role,
      };
    } catch (e) {
      this.logger.error(`LOGIN ERROR: ${e.message} | ${e.stack}`);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new InternalServerErrorException('Ошибка при авторизации');
    }
  }

  async register(login: string, password: string) {
    try {
      if (!login) {
        throw new BadRequestException('Логин обязателен');
      }

      if (!password) {
        throw new BadRequestException('Пароль обязателен');
      }

      if (login.length < 6 || password.length < 6) {
        throw new BadRequestException(
          'Логин и пароль должны быть больше 6 символов',
        );
      }

      const existingUser = await this.prisma.user.findUnique({
        where: { login: login },
      });

      if (existingUser) {
        throw new ConflictException(
          'Пользователь с таким логином уже существует',
        );
      }

      const hashPassword = await bcrypt.hash(password, 5);

      const newUser = await this.prisma.user.create({
        data: {
          login: login,
          password: hashPassword,
          role: 'USER',
        },
      });

      return {
        message: 'Аккаунт успешно создан',
        data: {
          id: newUser.id,
          login: newUser.login,
          role: newUser.role,
        },
      };
    } catch (e) {
      this.logger.error(`REGISTER ERROR: ${e.message} | ${e.stack}`);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new InternalServerErrorException('Ошибка при регистрации');
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      if (!refreshToken) {
        throw new UnauthorizedException('Токен обновления обязателен');
      }

      const payload = await this.jwt.verifyRefreshToken(refreshToken);

      if (!payload) {
        throw new UnauthorizedException('Не верный токен обновления');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }

      const newPayload = { id: user.id, login: user.login };
      const [accessToken, newRefreshToken] = await Promise.all([
        this.jwt.generateAccessToken(newPayload),
        this.jwt.generateRefreshToken(newPayload),
      ]);

      return {
        message: 'Токены обновлены',
        accessToken,
        refreshToken: newRefreshToken,
        role: user.role,
      };
    } catch (e) {
      this.logger.error(`Token refresh error: ${e.message}`);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new InternalServerErrorException('Ошибка при обновлении токена');
    }
  }
}
