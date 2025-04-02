import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { RecordInvididualDto } from './record-invididual-dto/record-invididual-dto.interface';
import { RecordGroupDTO } from './recorod-group-dto/RecordGroupDTO';

@Injectable()
export class RecordService {
  constructor(private readonly prisma: PrismaService) {}

  async createInvididualRecord(body: RecordInvididualDto) {
    try {
      if (body.telephoneNumber.length != 11) {
        console.log(body.telephoneNumber.length);
        throw new HttpException(
          'Не верный номер телефона',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (
        !body.firstName ||
        !body.lastName ||
        !body.surname ||
        !body.school ||
        !body.class ||
        !body.telephoneNumber ||
        !body.eventsId
      ) {
        throw new HttpException(
          'Не все поля заполнены',
          HttpStatus.BAD_REQUEST,
        );
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

        if (isRecord) {
          throw new HttpException(
            'Такой номер телефона уже записан',
            HttpStatus.BAD_REQUEST,
          );
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
      if (body.phone.length != 11) {
        throw new HttpException(
          'Не верный номер телефона',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (
        !body.firstNameAttendant ||
        !body.lastNameAttendant ||
        !body.surnameAttendant ||
        !body.school ||
        !body.class ||
        !body.countPeople ||
        !body.phone ||
        !body.eventsId
      ) {
        throw new HttpException(
          'Не все поля заполнены',
          HttpStatus.BAD_REQUEST,
        );
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

        if (isRecord) {
          throw new HttpException(
            'Такой номер телефона уже записан',
            HttpStatus.BAD_REQUEST,
          );
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
          return {
            message: `Запись успешно создана на мероприятие "${event.title}"`,
          };
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
      // const allRecords = await this.prisma.events.findMany({
      //   select: {
      //     id: true,
      //     title: true,
      //     date: true,
      //     recordInv: {
      //       select: {
      //         id: true,
      //         telephoneNumber: true,
      //         firstName: true,
      //         lastName: true,
      //         surname: true,
      //         school: true,
      //         createdAt: true,
      //       },
      //       orderBy: {
      //         id: 'desc'
      //       }
      //     },
      //     recordGr: {
      //       select: {
      //         id: true,
      //         firstNameAttendant: true,
      //         lastNameAttendant: true,
      //         SurnameAttendant: true,
      //         phone: true,
      //         school: true,
      //         countPeople: true,
      //         createdAt: true,
      //       },
      //       orderBy: {
      //         id: 'desc'
      //       }
      //     }},
      //     // orderBy: {
      //     //   createdAt: 'desc'
      //     // }
      // })

      // const filterRecords = allRecords.filter(item => item.recordInv.length > 0 || item.recordGr.length > 0)

      const [recordGroup, allRecordsInv] = await Promise.all([
        this.prisma.recordGroup.findMany({
          select: {
            id: true,
            firstNameAttendant: true,
            lastNameAttendant: true,
            SurnameAttendant: true,
            phone: true,
            school: true,
            countPeople: true,
            createdAt: true,
            listPeople: true,
            events: {
              select: {
                title: true,
                date: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        }),
        this.prisma.recordInvididual.findMany({
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
          orderBy: {
            createdAt: 'desc',
          },
        }),
      ]);

      // Обработка групповых записей
      const groupRecords = recordGroup.map((record) => ({
        id: record.id,
        name: `${record.lastNameAttendant} ${record.firstNameAttendant} ${record.SurnameAttendant}`,
        phone: record.phone,
        school: record.school,
        countPeople: record.countPeople,
        eventsTitle: record.events.title,
        eventsDate: record.events.date,
        recordDate: record.createdAt,
        listPeople: record.listPeople,
        type: 'Групповая',
      }));

      // Обработка индивидуальных записей
      const individualRecords = allRecordsInv.map((record) => ({
        id: record.id,
        name: `${record.lastName} ${record.firstName} ${record.surname}`,
        phone: record.telephoneNumber,
        school: record.school,
        countPeople: 1,
        eventsTitle: record.events.title,
        eventsDate: record.events.date,
        recordDate: record.createdAt,
        type: 'Индивидуальная', // Исправлена опечатка
      }));

      const result = [ ...individualRecords, ...groupRecords];
      if (result.length) {
        return { data: result, message: 'Записи успешно получены' };
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
