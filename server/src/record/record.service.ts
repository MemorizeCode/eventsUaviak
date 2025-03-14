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
                    id: body.eventsId
                }
            })

            if (event) {
                const records = await this.prisma.recordInvididual.findMany({
                    where: {
                        eventsId: body.eventsId
                    }
                })

                const recordGr = await this.prisma.recordGroup.findMany({
                    where: {
                        eventsId: body.eventsId
                    }
                })

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
                console.log(body)
                const newRecord = await this.prisma.recordInvididual.create({
                    data: {
                        firstName: body.firstName,
                        lastName: body.lastName,
                        surname: body.surname,
                        school: body.school,
                        class: body.class,
                        telephoneNumber: String(body.telephoneNumber),
                        eventsId: body.eventsId
                    }
                })
                return event.title
            }
            else {
                throw new HttpException("Мероприятие не найдено", HttpStatus.FORBIDDEN)
            }
        }
        catch (e) {
            throw new HttpException(e.message || "Ошибка сервера", HttpStatus.FORBIDDEN)
        }

    }

    async createGroupRecord(body: RecordGroupDTO, file) {
        try {
            const event = await this.prisma.events.findUnique({
                where: {
                    id: body.eventsId
                }
            })
            if (event) {
                const records = await this.prisma.recordInvididual.findMany({
                    where: {
                        eventsId: body.eventsId
                    }
                })

                const recordGr = await this.prisma.recordGroup.findMany({
                    where: {
                        eventsId: body.eventsId
                    }
                })

                const count = records.length + recordGr.reduce((prev, acc) => prev + acc.countPeople, 0)
                const countNow = body.countPeople
                console.log("Кол-во записанных: ", count)
                console.log("Кол-во сколько можно зап: ", event.people_count)

                if (count > event.people_count) {
                    throw new HttpException("Запись прекращена. Мест не осталось", HttpStatus.FORBIDDEN)
                }
                if (countNow + count > event.people_count) {
                    throw new HttpException("Запись прекращена Мест не осталось", HttpStatus.FORBIDDEN)
                }

                const newRecord = await this.prisma.recordGroup.create({
                    data: {
                        ...body
                    }
                })
                if (newRecord) {
                    return newRecord
                }
                throw new HttpException("Не известная ошибка. Проверьте введенные данные", HttpStatus.BAD_REQUEST)
            }
            throw new HttpException("Нету специальности", HttpStatus.BAD_GATEWAY)
        }
        catch (e) {
            throw new HttpException("Не известная ошибка. Проверьте введенные данные", HttpStatus.FORBIDDEN)
        }
    }

    async createFile(file, recordId) {
        try {
            const upd = await this.prisma.recordGroup.update({
                where: {
                    id: Number(recordId)
                },
                data: {
                    listPeople: file
                }
            })
            if (upd) {
                return { message: "Успешно!" }
            }
        }
        catch (e) {
            throw new HttpException("Ошибка при сохранение файла", HttpStatus.BAD_GATEWAY)
        }
    }

    async getRecords() {
        const result = []
        const allRecords = await this.prisma.recordGroup.findMany({
            select: {
                id: true,
                phone: true,
                school: true,
                countPeople: true,
                events: {
                    select: {
                        title: true
                    }
                }
            }
        })

        const allRecordsInv = await this.prisma.recordInvididual.findMany({
            select: {
                id: true,
                telephoneNumber: true,
                school: true,
                events: {
                    select: {
                        title: true
                    }
                }
            }
        })

        for (let key in allRecords) {
            const obj = {
                id: allRecords[key].id,
                phone: allRecords[key].phone,
                school: allRecords[key].school,
                countPeople: allRecords[key].countPeople,
                events: allRecords[key].events.title,
                type: "Групповая"
            }
            result.push(obj)
        }
        for (let key in allRecordsInv) {
            const obj = {
                id: allRecordsInv[key].id,
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
}
