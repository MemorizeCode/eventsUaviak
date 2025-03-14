import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { EventDTO } from './dto/Event.dto';

@Injectable()
export class EventsService {
    constructor(private readonly prisma: PrismaService) { }

    async createEvent(body: EventDTO, user) {
        try {
            if (!body.title) {
                throw new HttpException("Заполненые не все поля", HttpStatus.FORBIDDEN)
            }
            const event = await this.prisma.events.create({
                data: {
                    title: body.title,
                    description: body.description,
                    date: new Date(body.date),
                    times: String(body.times),
                    duration: Number(body.duration),
                    cabinet: String(body.cabinet),
                    people_count: Number(body.people_count),
                    whoClasses: String(body.whoClasses),
                    specialityId: Number(body.specialityId),
                    prepod: body.prepod
                }
            })
            if (event) {
                return { message: "Мероприятие создано." }
            }
            else {
                throw new HttpException("Ошибка создания", HttpStatus.FORBIDDEN)
            }
        }
        catch (e) {
            if (e.code === 'P2003') {
                throw new HttpException("Нету специальности", HttpStatus.FORBIDDEN)
            }
            console.log(e)
            throw new HttpException(e.response, HttpStatus.FORBIDDEN)
        }
    }

    async deleteEvent(id) {
        try {
            const isEvent = await this.prisma.events.update({
                where: {
                    id: Number(id)
                },
                data: {
                    isDelete: true
                }
            })
            if (isEvent) {
                return { message: "Успешно" }
            }
        }
        catch (e) {
            throw new HttpException("Not found event", 401)
        }
    }


    async getEvents() {
        // const events = await this.prisma.events.findMany({
        //     where: {
        //         isDelete: false
        //     },
        //     include: {
        //         eventSpeciality: true
        //     }
        // })
        // const r = []
        // for (let i = 0; i < events.length; i++) {
        //     const idEvent = events[i].id
            // const records = await this.prisma.recordInvididual.findMany({
            //     where: {
            //         eventsId: idEvent
            //     }
            // })
            // const recordGr = await this.prisma.recordGroup.findMany({
            //     where: {
            //         eventsId: idEvent
            //     }
            // })
            // const count = records.length + recordGr.reduce((prev, acc) => prev + acc.countPeople, 0)
            // const ostalosMest = events[i].people_count - count
        //     const obj = {
        //         events: events,
        //         ostalosMest: ostalosMest
        //     }
        //     r.push(obj)
        // }
        // if (!events.length) {
        //     return { message: "Ивентов нету" }
        // }
        // return r.reverse()

        let result = []

        //Все ивенты
        const events = await this.prisma.events.findMany({
            where: {
                isDelete: false
            },
            include: {
                eventSpeciality: true
            }
        })


        if(!events){
            return {message:"Нет мероприяйтий"}
        }

        //чек свободные места
        for(let i = 0;i <events.length;i++){
            const idEvent = events[i].id
            const records = await this.prisma.recordInvididual.findMany({
                where: {
                    eventsId: idEvent
                }
            })
            const recordGr = await this.prisma.recordGroup.findMany({
                where: {
                    eventsId: idEvent
                }
            })
            const count = records.length + recordGr.reduce((prev, acc) => prev + acc.countPeople, 0)
            const ostalosMest = events[i].people_count - count

            const data = {
                event:events[i],
                ostalosMest: ostalosMest
            }

            result.push(data)
        }

        return result.reverse()
        
    }

    async getEvent(id) {
        const event = await this.prisma.events.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                eventSpeciality: true
            }
        })
        if (!event) {
            return { message: "Не найдено" }
        }
        return event
    }
}
