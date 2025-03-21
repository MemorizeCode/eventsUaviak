import { Body, Controller, Delete, Get, HttpCode, Post, Query, UseGuards } from '@nestjs/common';
import { SpesialService } from './spesial.service';
import { AdminGuard } from 'src/guard/admin.guard';

@Controller('/spesial')
export class SpesialController {
  constructor(private readonly spesialService: SpesialService) {}

  @Get("/getSpesial")
  @HttpCode(200)
  async getSpesial(){
    const result = await this.spesialService.getSpesial()
    return result
  }
  
}
