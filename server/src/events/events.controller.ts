import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventDTO } from './dto/Event.dto';
import { AdminGuard } from 'src/guard/admin.guard';


@Controller('/api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AdminGuard)
  @Post('/createEvent')
  @HttpCode(200)
  async createEvent(@Body() body: EventDTO, @Req() req){
    const user = req.user
    const result = await this.eventsService.createEvent(body, user)
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

  @Get("/getEvent/:id")
  @HttpCode(200)
  async getEvens(@Param() param){
    const {id} = param
    const result = await this.eventsService.getEvent(id)
    return result
  }



}

// {
//   "title": "Title 1",
//  "description": "Descr",
//  "date": "2020-02-02",
//  "time": "11:41",
//  "duration": "60",
//  "cabinet": "404",
//  "people_count": "5",
//  "whoClasses": "4A",
//  "specialityId": "2"
// }