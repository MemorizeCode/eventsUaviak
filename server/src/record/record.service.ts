import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { RecordInvididualDto } from './record-invididual-dto/record-invididual-dto.interface';
import { RecordGroupDTO } from './recorod-group-dto/RecordGroupDTO';

@Injectable()
export class RecordService {
    constructor(private readonly prisma: PrismaService) { }

    async createInvididualRecord(body: RecordInvididualDto) {
        try {

            const event = await this.prisma.events.findUnique({
                where: {
                    id: Number(body.eventsId)
                }
            })

            if (event) {
                const [records, recordGr] = await Promise.all([
                    await this.prisma.recordInvididual.findMany({
                        where: {
                            eventsId: Number(body.eventsId)
                        }
                    }),
    
                    await this.prisma.recordGroup.findMany({
                        where: {
                            eventsId: Number(body.eventsId)
                        }
                    })
                ])

                const count = records.length + recordGr.reduce((prev, acc) => prev + acc.countPeople, 0)
                const countNow = 1
                console.log("Кол-во записанных: ", count)
                console.log("Кол-во сколько можно зап: ", event.people_count)

                if (count > event.people_count) {
                    throw new HttpException("Запись прекращена. Мест не осталось", HttpStatus.FORBIDDEN)
                }
                if (countNow + count > event.people_count) {
                    throw new HttpException("Запись прекращена. Мест не осталось", HttpStatus.FORBIDDEN)
                }

                const newRecord = await this.prisma.recordInvididual.create({
                    data: {
                        firstName: body.firstName,
                        lastName: body.lastName,
                        surname: body.surname,
                        school: body.school,
                        class: body.class,
                        telephoneNumber: String(body.telephoneNumber),
                        eventsId: Number(body.eventsId)
                    }
                })
                return {message: `Запись успешно создана на мероприятие "${event.title}"`}
            }
            throw new HttpException("Мероприятие не найдено", HttpStatus.NOT_FOUND)
        }
        catch (e) {
            console.log(e)
            if(e instanceof HttpException){
                throw e
            }
            throw new HttpException("Ошибка сервера. Попробуйте позже", HttpStatus.FORBIDDEN)
        }

    }

    async createGroupRecord(body: RecordGroupDTO, file) {
        try {
            const event = await this.prisma.events.findUnique({
                where: {
                    id: Number(body.eventsId)
                }
            })
            if (event) {

                const [records, recordGr] = await Promise.all([
                    await this.prisma.recordInvididual.findMany({
                        where: {
                            eventsId: Number(body.eventsId)
                        }
                    }),
    
                    await this.prisma.recordGroup.findMany({
                        where: {
                            eventsId: Number(body.eventsId)
                        }
                    })
                ])

                const count = records.length + recordGr.reduce((prev, acc) => prev + acc.countPeople, 0)

                const countNow = Number(body.countPeople)
                console.log("Кол-во записанных: ", count)
                console.log("Кол-во сколько можно зап: ", event.people_count)
                console.log("На запись: ", body.countPeople)

                if (count > event.people_count) {
                    throw new HttpException("Запись прекращена. Мест не осталось", HttpStatus.FORBIDDEN)

                }
                if (countNow + count > event.people_count) {
                    throw new HttpException("Запись прекращена. Мест не осталось", HttpStatus.FORBIDDEN)
                }

                const newRecord = await this.prisma.recordGroup.create({
                    data: {
                        firstNameAttendant: body.firstNameAttendant,
                        lastNameAttendant: body.lastNameAttendant,
                        SurnameAttendant: body.surnameAttendant,
                        school: body.school,
                        class: body.class,
                        countPeople: Number(body.countPeople),
                        listPeople: file.filename,
                        eventsId: Number(body.eventsId),
                        phone: body.phone
                    }
                })
                if (newRecord) {
                    return {message: "Запись успешно создана"}
                }
            }
            throw new HttpException("Мероприятие не найдено", HttpStatus.NOT_FOUND)
        }
        catch (e) {
            console.log(e)
            if(e instanceof HttpException){
                throw e
            }
            throw new HttpException("Не известная ошибка. Попробуйте позже", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async getRecords() {
        try{

            const result = []
            const [recordGroup, allRecordsInv] = await Promise.all([
    
                await this.prisma.recordGroup.findMany({
                    select: {
                        id: true,
                        firstNameAttendant: true,
                        lastNameAttendant: true,
                        SurnameAttendant: true,
                        phone: true,
                        school: true,
                        countPeople: true,
                        events: {
                            select: {
                                title: true
                            }
                        }
                    }
                }),
        
                await this.prisma.recordInvididual.findMany({
                    select: {
                        id: true,
                        telephoneNumber: true,
                        firstName: true,
                        lastName: true,
                        surname: true,
                        school: true,
                        events: {
                            select: {
                                title: true
                            }
                        }
                    }
                })
            ])
    
            for (let key in recordGroup) {
                const obj = {
                    id: recordGroup[key].id,
                    name: `${recordGroup[key].lastNameAttendant} ${recordGroup[key].firstNameAttendant} ${recordGroup[key].SurnameAttendant}`,
                    phone: recordGroup[key].phone,
                    school: recordGroup[key].school,
                    countPeople: recordGroup[key].countPeople,
                    events: recordGroup[key].events.title,
                    type: "Групповая"
                }
                result.push(obj)
            }
            for (let key in allRecordsInv) {
                const obj = {
                    id: allRecordsInv[key].id,
                    name: `${allRecordsInv[key].lastName} ${allRecordsInv[key].firstName} ${allRecordsInv[key].surname}`,
                    school: allRecordsInv[key].school,
                    phone: allRecordsInv[key].telephoneNumber,
                    countPeople: 1,
                    events: allRecordsInv[key].events.title,
                    type: "Инвидидуальная"
                }
                result.push(obj)
            }
            if (result.length) {
                return result
            }
            return { message: "Записей нету" }
        }
        catch(e){
            console.log(e)
            if(e instanceof HttpException){
                throw e
            }
            throw new HttpException("Не известная ошибка. Попробуйте позже", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
