import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { OtchetService } from './otchet.service';
@Controller('/otchet')
export class OtchetController {
  constructor(private readonly otchetService: OtchetService) {}

  @Get('/spesialVostrebovanie')
  @HttpCode(200)
  async spesial() {
    const result = await this.otchetService.getEventsStatistics();
    return result;
  }

  @Get('/school')
  @HttpCode(200)
  async school() {
    const result = await this.otchetService.school();
    return result;
  }

  @Get('/getPeopleYear')
  @HttpCode(200)
  async getPeopleYear(@Query() query) {
    const { year } = query;
    const result = await this.otchetService.getPeopleYear(year);
    return result;
  }

  @Get('/getPeopleMouth')
  @HttpCode(200)
  async getPeopleMount(@Query() query) {
    const { mouth, year } = query;
    const result = await this.otchetService.getPeopleMounth(mouth, year);
    return result;
  }

  @Get('/getPeopleCountSpec')
  @HttpCode(200)
  async getPeopleCountSpec() {
    const result = await this.otchetService.getPeopleCountSpec();
    return result;
  }
}
