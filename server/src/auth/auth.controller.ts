import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  @HttpCode(200)
  async login(@Body() body){
    const {login,password} = body
    const result = await this.authService.login(login,password)
    return result
  }

  @Post("/register")
  @HttpCode(200)
  async register(@Body() body){
    const {login,password} = body
    const result = await this.authService.register(login,password)
    return result
  }

  @Post("/token")
  @HttpCode(200)
  async token(@Body() body){
    const {token} = body
    const result = await this.authService.token(token)
    return result
  }
}
