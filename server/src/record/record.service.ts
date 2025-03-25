import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { RecordInvididualDto } from './record-invididual-dto/record-invididual-dto.interface';
import { RecordGroupDTO } from './recorod-group-dto/RecordGroupDTO';

@Injectable()
export class RecordService {
  constructor(private readonly prisma: PrismaService) {}

  async createInvididualRecord(body: RecordInvididualDto) {
    try {
      if(!body.firstName || !body.lastName || !body.surname || !body.school || !body.class || !body.telephoneNumber || !body.eventsId){
        throw new HttpException('Не все поля заполнены', HttpStatus.BAD_REQUEST);
      }

      const event = await this.prisma.events.findUnique({
        where: {
          id: Number(body.eventsId),
        },
      });

      if (event) {
        //проверка уже существующих записей
        const isRecord = await this.prisma.recordInvididual.findFirst({
          where: {
            eventsId: Number(body.eventsId),
            telephoneNumber: String(body.telephoneNumber),
          },
        });

        if(isRecord){
          throw new HttpException('Такой номер телефона уже записан', HttpStatus.BAD_REQUEST);
        }

        const [records, recordGr] = await Promise.all([
          await this.prisma.recordInvididual.findMany({
            where: {
              eventsId: Number(body.eventsId),
            },
          }),

          await this.prisma.recordGroup.findMany({
            where: {
              eventsId: Number(body.eventsId),
            },
          }),
        ]);

        const count =
          records.length +
          recordGr.reduce((prev, acc) => prev + acc.countPeople, 0);
        const countNow = 1;
        console.log('Кол-во записанных: ', count);
        console.log('Кол-во сколько можно зап: ', event.people_count);

        if (count > event.people_count) {
          throw new HttpException(
            'Запись прекращена. Мест не осталось',
            HttpStatus.FORBIDDEN,
          );
        }
        if (countNow + count > event.people_count) {
          throw new HttpException(
            'Запись прекращена. Мест не осталось',
            HttpStatus.FORBIDDEN,
          );
        }

        await this.prisma.recordInvididual.create({
          data: {
            firstName: body.firstName,
            lastName: body.lastName,
            surname: body.surname,
            school: body.school,
            class: body.class,
            telephoneNumber: String(body.telephoneNumber),
            eventsId: Number(body.eventsId),
          },
        });
        return {
          message: `Запись успешно создана на мероприятие "${event.title}"`,
        };
      }
      throw new HttpException('Мероприятие не найдено', HttpStatus.NOT_FOUND);
    } catch (e) {
      console.log(e);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Ошибка сервера. Попробуйте позже',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async createGroupRecord(body: RecordGroupDTO, file) {
    try {
      if(!body.firstNameAttendant || !body.lastNameAttendant || !body.surnameAttendant || !body.school || !body.class || !body.countPeople || !body.phone || !body.eventsId){
        throw new HttpException('Не все поля заполнены', HttpStatus.BAD_REQUEST);
      }

      const event = await this.prisma.events.findUnique({
        where: {
          id: Number(body.eventsId),
        },
      });
      if (event) {
        //проверка уже существующих записей
        const isRecord = await this.prisma.recordGroup.findFirst({
          where: {
            eventsId: Number(body.eventsId),
            phone: body.phone,
          },
        });
        
        if(isRecord){
          throw new HttpException('Такой номер телефона уже записан', HttpStatus.BAD_REQUEST);
        }

        const [records, recordGr] = await Promise.all([
          await this.prisma.recordInvididual.findMany({
            where: {
              eventsId: Number(body.eventsId),
            },
          }),

          await this.prisma.recordGroup.findMany({
            where: {
              eventsId: Number(body.eventsId),
            },
          }),
        ]);

        const count =
          records.length +
          recordGr.reduce((prev, acc) => prev + acc.countPeople, 0);

        const countNow = Number(body.countPeople);
        console.log('Кол-во записанных: ', count);
        console.log('Кол-во сколько можно зап: ', event.people_count);
        console.log('На запись: ', body.countPeople);

        if (count > event.people_count) {
          throw new HttpException(
            'Запись прекращена. Мест не осталось',
            HttpStatus.FORBIDDEN,
          );
        }
        if (countNow + count > event.people_count) {
          throw new HttpException(
            'Запись прекращена. Мест не осталось',
            HttpStatus.FORBIDDEN,
          );
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
            phone: body.phone,
          },
        });
        if (newRecord) {
          return { message: 'Запись успешно создана' };
        }
      }
      throw new HttpException('Мероприятие не найдено', HttpStatus.NOT_FOUND);
    } catch (e) {
      console.log(e);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Не известная ошибка. Попробуйте позже',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRecords() {
    try {
      const result = [];
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
            createdAt: true,
            events: {
              select: {
                title: true,
                date: true,
              },
            },
          },
        }),

        await this.prisma.recordInvididual.findMany({
          select: {
            id: true,
            telephoneNumber: true,
            firstName: true,
            lastName: true,
            surname: true,
            school: true,
            createdAt: true,
            events: {
              select: {
                title: true,
                date: true,
              },
            },
          },
        }),
      ]);

      for (const key in recordGroup) {
        const obj = {
          id: recordGroup[key].id,
          name: `${recordGroup[key].lastNameAttendant} ${recordGroup[key].firstNameAttendant} ${recordGroup[key].SurnameAttendant}`,
          phone: recordGroup[key].phone,
          school: recordGroup[key].school,
          countPeople: recordGroup[key].countPeople,
          eventsTitle: recordGroup[key].events.title,
          eventsDate: recordGroup[key].events.date,
          recordDate: recordGroup[key].createdAt,
          type: 'Групповая',
        };
        result.push(obj);
      }
      for (const key in allRecordsInv) {
        const obj = {
          id: allRecordsInv[key].id,
          name: `${allRecordsInv[key].lastName} ${allRecordsInv[key].firstName} ${allRecordsInv[key].surname}`,
          school: allRecordsInv[key].school,
          phone: allRecordsInv[key].telephoneNumber,
          countPeople: 1,
          eventsTitle: allRecordsInv[key].events.title,
          eventsDate: allRecordsInv[key].events.date,
          recordDate: allRecordsInv[key].createdAt,
          type: 'Инвидидуальная',
        };
        result.push(obj);
      }
      if (result.length) {
        return {data: result.reverse(), message: 'Записи успешно получены'}
      }
      return { message: 'Записей нету', data: [] };
    } catch (e) {
      console.log(e);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Не известная ошибка. Попробуйте позже',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
