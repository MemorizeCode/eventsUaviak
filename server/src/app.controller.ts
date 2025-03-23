import { Controller, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AdminGuard } from './guard/admin.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AdminGuard)
  @Post('/loadSpecial')
  async loadSpecial() {
    return await this.appService.loadSpecial();
  }
}
