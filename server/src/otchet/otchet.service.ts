import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import * as luxon from 'luxon';
@Injectable()
export class OtchetService {
  constructor(private readonly prisma: PrismaService) { }
  async getPeopleYear(year) {
    try {

      const targetYear = Number(year);
      const startOfYear = luxon.DateTime.local().set({ year: targetYear, month: 1, day: 1 }).toISO(); // Начало года
      const currentDateUTC = luxon.DateTime.local(); // текущая дата
    
      const endOfDay = currentDateUTC.year === targetYear ? 
      currentDateUTC.toISO() : 
      luxon.DateTime.local().set({ year: targetYear, month: 12, day: 31 }).toISO(); // Конец года

      const [dataInv, dataGr] = await Promise.all([
        this.prisma.recordInvididual.findMany({
          where: {
            events: {
              is: {
                date: {
                  gte: startOfYear, // Начало года
                  lte: endOfDay,   // Конец года
                },
              },
            },
          },
          include: {
            events: true,
          },
        }),
        this.prisma.recordGroup.findMany({
          where: {
            events: {
              is: {
                date: {
                  gte: startOfYear, // Начало года
                  lte: endOfDay,   // Конец года
                },
              },
            },
          },
          include: {
            events: true,
          },
        }),
      ]);

      const resultCountGr = dataGr.reduce((acc, rec) => {
        const count = Number(rec.countPeople) || 0;
        return count + acc;
      }, 0);

      const resultCountInv = dataInv.length;
      
      const resultCount = resultCountGr + resultCountInv

      return { data: resultCount };
    } catch (e) {
      console.log(e)
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Не известная ошибка. Попробуйте позже',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPeopleMounth(m, y) {
    try {
      if (!m || !y) {
        throw new HttpException('Нету месяца или года', HttpStatus.BAD_REQUEST);
      }
      
      const currentDateUTC = luxon.DateTime.local(); 
      const startOfMonth = luxon.DateTime.local().set({ year: y, month: m, day: 1 }).toISO(); 
      const endOfMonth = luxon.DateTime.local().set({ year: y, month: m, day: 1 }).plus({ months: 1 }).minus({ days: 1 }).toISO(); 
      const endOfDay = currentDateUTC < luxon.DateTime.fromISO(endOfMonth) ? currentDateUTC.toISO() : endOfMonth; 

      const [dataInv, dataGr] = await Promise.all([
        this.prisma.recordInvididual.findMany({
          where: {
            events: {
              is: {
                date: {
                  gte: startOfMonth, // Начало месяца
                  lte: endOfDay,     // Конец диапазона
                },
              },
            },
          },
          include: {
            events: true,
          },
        }),
        this.prisma.recordGroup.findMany({
          where: {
            events: {
              is: {
                date: {
                  gte: startOfMonth, // Начало месяца
                  lte: endOfDay,     // Конец диапазона
                },
              },
            },
          },
          include: {
            events: true,
          },
        }),
      ]);
      const resultCountGr = dataGr.reduce((acc, rec) => {
        const count = Number(rec.countPeople) || 0;
        return count + acc;
      }, 0);

      const resultCountInv = dataInv.length;
      
      const resultCount = resultCountGr + resultCountInv

      return { data: resultCount };

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

  async getEventsStatistics() {
    try {
      const events = await this.prisma.events.findMany({
        where: { isDelete: false },
        include: {
          eventSpeciality: true,
          recordInv: true,
          recordGr: true,
        },
      });

      if (events.length === 0) {
        return { message: 'Нет мероприятий' };
      }

      const specialityStats = events.reduce((acc, event) => {
        const specialityId = event.eventSpeciality.id;
        const specialityTitle = event.eventSpeciality.title;

        if (!acc[specialityId]) {
          acc[specialityId] = {
            title: specialityTitle,
            totalRegistrations: 0,
            eventsCount: 0,
          };
        }

        const individualCount = event.recordInv.length;
        const groupCount = event.recordGr.reduce(
          (sum, record) => sum + record.countPeople,
          0,
        );

        acc[specialityId].totalRegistrations += individualCount + groupCount;
        acc[specialityId].eventsCount += 1;

        return acc;
      }, {});

      const sortedSpecialities = Object.values(specialityStats).sort(
        (a: any, b: any) => b.totalRegistrations - a.totalRegistrations,
      );

      return {
        message: 'Статистика по спец. востребованны',
        data: sortedSpecialities[0],
      };
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Не известная ошибка. Попробуйте позже',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPeopleCountSpec() {
    const result = [];

    const [recordGr, recordInv] = await Promise.all([
      await this.prisma.recordGroup.findMany({
        select: {
          id: true,
          school: true,
          countPeople: true,
          events: {
            include: {
              eventSpeciality: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      }),
      await this.prisma.recordInvididual.findMany({
        select: {
          id: true,
          school: true,
          events: {
            include: {
              eventSpeciality: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      }),
    ]);

    for (let i = 0; i < recordGr.length; i++) {
      const spec = recordGr[i].events.eventSpeciality.title;
      const school = recordGr[i].school;
      const peopleCount = recordGr[i].countPeople;
      const dataObj = {
        spec: spec,
        count: peopleCount,
        school: school,
      };
      const findData = result.find(
        (e) => e.school == dataObj.school && e.spec == dataObj.spec,
      );
      if (findData) {
        findData.count += dataObj.count;
      } else {
        result.push(dataObj);
      }
    }

    for (let i = 0; i < recordInv.length; i++) {
      const spec = recordInv[i].events.eventSpeciality.title;
      const school = recordInv[i].school;
      const peopleCount = 1;
      const dataObj = {
        spec: spec,
        count: peopleCount,
        school: school,
      };
      const findData = result.find(
        (e) => e.school == dataObj.school && e.spec == dataObj.spec,
      );
      if (findData) {
        findData.count += dataObj.count;
      } else {
        result.push(dataObj);
      }
    }
    return result;
  }

  async school() {
    try {
      const schoolInv = await this.prisma.recordInvididual.findMany({
        select: {
          id: true,
          school: true,
        },
      });
      const schoolGro = await this.prisma.recordGroup.findMany({
        select: {
          id: true,
          school: true,
        },
      });
      const allData = [...schoolInv, ...schoolGro];
      const f = allData
        .filter(
          (value, index, data) =>
            index === data.findIndex((e) => e.school == value.school),
        )
        .map((e) => {
          const id = Math.floor(Date.now() * Math.random() * 0.5);
          return { id: id, school: e.school };
        });
      return { message: 'Школы посетили мероприятия', data: f };
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
