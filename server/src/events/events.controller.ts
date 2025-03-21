import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventDTO } from './dto/Event.dto';
import { AdminGuard } from 'src/guard/admin.guard';


@Controller('/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AdminGuard)
  @Post('/createEvent')
  @HttpCode(200)
  async createEvent(@Body() body: EventDTO, ){
    const result = await this.eventsService.createEvent(body)
    return result
  }

  @UseGuards(AdminGuard)
  @Put("/updateEvent")
  @HttpCode(200)
  async updateEvent(@Body() body: EventDTO){
    const result = await this.eventsService.updateEvent(body)
    return result
  }


  @UseGuards(AdminGuard)
  @Delete("/deleteEvent")
  @HttpCode(200)
  async deleteEvent(@Query() query, @Req() req){
    const { id } = query
    console.log(query)
    const result = await this.eventsService.deleteEvent(id)
    return result
  }

  @Get("/getEvents")
  @HttpCode(200)
  async getAllEvents(){
    const result = await this.eventsService.getEvents()
    return result
  }

}
