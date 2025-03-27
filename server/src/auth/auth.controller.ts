import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Request } from 'express';
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() body,
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { login, password } = body;
    const keys = req.headers;
    const result = await this.authService.login(login, password, keys);
    const { refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 день
    });
    return result;
  }

  @Post('/register')
  @HttpCode(200)
  async register(@Body() body) {
    const { login, password } = body;
    const result = await this.authService.register(login, password);
    return result;
  }

  @Post('/token')
  @HttpCode(200)
  async token(@Req() request: Request) {
    const refreshToken = request.cookies['refreshToken'];
    const result = await this.authService.refreshToken(refreshToken);
    return result;
  }

  @Post('/logout')
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken');
    return { ok: true };
  }
}
