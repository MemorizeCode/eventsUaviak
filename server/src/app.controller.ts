import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AdminGuard } from './guard/admin.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AdminGuard)
  @Post('/loadSpecial')
  @HttpCode(200)
  async loadSpecial() {
    return await this.appService.loadSpecial();
  }

  @UseGuards(AdminGuard)
  @Post('/ev/def')
  @HttpCode(200)
  async loadEvents() {
    return await this.appService.loadEvents();
  }
}
