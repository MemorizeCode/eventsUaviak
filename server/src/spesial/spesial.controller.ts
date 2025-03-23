import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SpesialService } from './spesial.service';
import { AdminGuard } from 'src/guard/admin.guard';

@Controller('/spesial')
export class SpesialController {
  constructor(private readonly spesialService: SpesialService) {}

  @Get('/getSpesial')
  @HttpCode(200)
  async getSpesial() {
    const result = await this.spesialService.getSpesial();
    return result;
  }

  @UseGuards(AdminGuard)
  @Put('/updateSpecial')
  @HttpCode(200)
  async updateSpecial(@Body() body) {
    const result = await this.spesialService.updateSpecial(body);
    return result;
  }

  @UseGuards(AdminGuard)
  @Post('/newSpecial')
  @HttpCode(200)
  async newSpecial(@Body() body) {
    const result = await this.spesialService.newSpecial(body);
    return result;
  }

  @UseGuards(AdminGuard)
  @Delete('/deleteSpecial')
  @HttpCode(200)
  async deleteSpecial(@Query('id') id: string) {
    const result = await this.spesialService.deleteSpecial(id);
    return result;
  }
}
