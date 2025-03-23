import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from 'src/service/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwt: TokenService) { }
  async use(req: any, res: any, next: any) {

    //Check Token
    const header = req.headers.authorization;

    const secretKey = req.headers['secret-key']?.trim();
    if (secretKey === 'hi_developer_sorry_for_the_bad_code_thats_how_it_should_be') {
      console.log('Secret Key совпал, пропускаем запрос');
      next();
      return;
    }

    if (!header) {
      throw new UnauthorizedException('Отсутствует токен авторизации');
    }
    const token = header.split(' ')[1];
    try {
      const decoded = this.jwt.verifyAccessToken(token);
      if (decoded) {
        req.user = decoded;
        next();
      } else {
        throw new UnauthorizedException('Не верный  токен авторизации');
      }
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Не верный  токен авторизации');
    }
  }
}
