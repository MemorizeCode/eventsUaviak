import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { RecordInvididualDto } from './record-invididual-dto/record-invididual-dto.interface';
import { RecordGroupDTO } from './recorod-group-dto/RecordGroupDTO';
import * as luxon from 'luxon';
@Injectable()
export class RecordService {
  constructor(private readonly prisma: PrismaService) { }


  private async checkEventDate(date: Date) {
    const eventDate = luxon.DateTime.fromISO(new Date(date).toISOString(), { setZone: true });
    const currentDate = luxon.DateTime.local();
    if (eventDate.toISO() < currentDate.toISO()) {
      return true
    }
    return false
  }

  private async checkPhoneValidate(phone: string) {
    let telephoneNumber;
    if (phone.length != 11) return false
    if (phone.startsWith('8')) {
      telephoneNumber = '7' + phone.slice(1);
    } else {
      telephoneNumber = phone;
    }
    return telephoneNumber
  }

  private async checkRecordExists(eventsId: number, telephoneNumber: string) {
    const isRecord = await this.prisma.recordInvididual.findFirst({
      where: {
        eventsId: Number(eventsId),
        telephoneNumber: String(telephoneNumber),
      },
    });

    const isRecordInv = await this.prisma.recordGroup.findFirst({
      where: {
        eventsId: Number(eventsId),
        phone: String(telephoneNumber),
      },
    });

    if (isRecord || isRecordInv) {
      return false
    }
    return true
  }

  private async checkRecordCount(eventsId: number, typeRecord: "individual" | "group", countPeople?: number, event?: any) {
    const [records, recordGr] = await Promise.all([
      await this.prisma.recordInvididual.findMany({
        where: {
          eventsId: Number(eventsId),
        },
      }),

      await this.prisma.recordGroup.findMany({
        where: {
          eventsId: Number(eventsId),
        },
      }),
    ]);

    const count =
      records.length +
      recordGr.reduce((prev, acc) => prev + acc.countPeople, 0);
    const countNow = typeRecord === "individual" ? 1 : countPeople;


    if (count > event.people_count || countNow + count > event.people_count) {
      return false
    }
    return true
  }

  async createInvididualRecord(body: RecordInvididualDto) {
    try {
      if (body.telephoneNumber.length != 11) {
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
        const isDatePassed = await this.checkEventDate(event.date)
        if (isDatePassed) {
          throw new HttpException(
            'Мероприятие уже прошло!',
            HttpStatus.BAD_REQUEST,
          );
        }
        const telephoneNumber = await this.checkPhoneValidate(body.telephoneNumber)
        const isRecordExists = await this.checkRecordExists(body.eventsId, telephoneNumber)

        if (!isRecordExists) {
          throw new HttpException(
            'Такой номер телефона уже записан',
            HttpStatus.BAD_REQUEST,
          );
        }
        const isRecordCount = await this.checkRecordCount(body.eventsId, "individual", 0, event)
        if (!isRecordCount) {
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
            telephoneNumber: telephoneNumber,
            eventsId: Number(body.eventsId),
            createdAt: luxon.DateTime.local().setZone('UTC+4').toJSDate(), 
          },
        });
        console.log(luxon.DateTime.local().toISO())
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

        const isDatePassed = await this.checkEventDate(event.date)
        if (isDatePassed) {
          throw new HttpException(
            'Мероприятие уже прошло!',
            HttpStatus.BAD_REQUEST,
          );
        }
        const telephoneNumber = await this.checkPhoneValidate(body.phone)

        const isRecordExists = await this.checkRecordExists(body.eventsId, telephoneNumber)


        if (!isRecordExists) {
          throw new HttpException(
            'Такой номер телефона уже записан',
            HttpStatus.BAD_REQUEST,
          );
        }

        const isRecordCount = await this.checkRecordCount(body.eventsId, "group", Number(body.countPeople), event)
        if (!isRecordCount) {
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
            phone: String(telephoneNumber),
            createdAt: luxon.DateTime.local().setZone('UTC+4').toJSDate(), 
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
                times: true,
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
                times: true
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
        time: record.events.times,
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
        time: record.events.times,
        type: 'Индивидуальная', 
      }));

      const result = [...individualRecords, ...groupRecords];

      //Сортировка по дате
      const sortedResult = result.sort(
        (a, b) =>
          new Date(b.recordDate).getTime() - new Date(a.recordDate).getTime(),
      );

      if (sortedResult.length) {
        return { data: sortedResult, message: 'Записи успешно получены' };
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
