import { Body, Controller, Delete, Get, HttpCode, Post, Query, UseGuards } from '@nestjs/common';
import { SpesialService } from './spesial.service';
import { AdminGuard } from 'src/guard/admin.guard';

@Controller('/api/spesial')
export class SpesialController {
  constructor(private readonly spesialService: SpesialService) {}

  @UseGuards(AdminGuard)
  @Post('/createSpesial')
  @HttpCode(200)
  async createSpesial(@Body() body){
    const {title} = body
    const result = await this.spesialService.createSpesial(title)
    return result
  }

  @UseGuards(AdminGuard)
  @Delete("/deleteSpesial")
  @HttpCode(200)
  async deleteSpesial(@Query() query){
    const {id} = query
    const result = await this.spesialService.deleteSpesial(id)
    return result
  }

  @Get("/getSpesial")
  @HttpCode(200)
  async getSpesial(){
    const result = await this.spesialService.getSpesial()
    return result
  }
}
