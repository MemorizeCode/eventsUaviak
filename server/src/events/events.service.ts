import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { EventDTO } from './dto/Event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(body: EventDTO) {
    try {
      if (
        !body.title ||
        !body.description ||
        !body.date ||
        !body.times ||
        !body.duration ||
        !body.cabinet ||
        !body.people_count ||
        !body.whoClasses ||
        !body.specialityId ||
        !body.prepod
      ) {
        throw new HttpException(
          'Поля не могут быть пустыми',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.prisma.events.create({
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
          prepod: body.prepod,
        },
      });
      return { message: 'Мероприятие создано.' };
    } catch (e) {
      if (e.code === 'P2003') {
        throw new HttpException(
          'Специальность не найдена',
          HttpStatus.NOT_FOUND,
        );
      }
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Неизвестная ошибка. Попробуйте позже',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateEvent(body: EventDTO) {
    try {
      if (!Number(body.id)) {
        throw new HttpException('Нету id мероприятия', HttpStatus.BAD_REQUEST);
      }

      const event = await this.prisma.events.findUnique({
        where: { id: Number(body.id) },
        select: {
          isDelete: true,
        },
      });

      if (event.isDelete) {
        throw new HttpException('Мероприятие удалено', HttpStatus.NOT_FOUND);
      }

      const updateData: any = {};

      if (body.title) updateData.title = String(body.title);
      if (body.description) updateData.description = String(body.description);
      if (body.date) updateData.date = new Date(body.date);
      if (body.times) updateData.times = String(body.times);
      if (body.duration) updateData.duration = Number(body.duration);
      if (body.cabinet) updateData.cabinet = String(body.cabinet);
      if (body.people_count)
        updateData.people_count = Number(body.people_count);
      if (body.whoClasses) updateData.whoClasses = String(body.whoClasses);
      if (body.specialityId)
        updateData.specialityId = Number(body.specialityId);
      if (body.prepod) updateData.prepod = String(body.prepod);

      await this.prisma.events.update({
        where: { id: Number(body.id) },
        data: updateData,
      });

      return { message: 'Мероприятие обновлено.' };
    } catch (e) {
      if (e.code === 'P2025') {
        throw new HttpException('Мероприятие не найдено', HttpStatus.NOT_FOUND);
      }
      if (e.code === 'P2003') {
        throw new HttpException(
          'Специальность не найдена',
          HttpStatus.NOT_FOUND,
        );
      }
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Неизвестная ошибка. Попробуйте позже',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteEvent(id) {
    try {
      if (!id) {
        throw new HttpException('Нету id мероприятия', HttpStatus.BAD_REQUEST);
      }
      const isEvent = await this.prisma.events.findUnique({
        where: { id: Number(id) },
        select: {
          isDelete: true,
        },
      });
      const [recordInv, recordGr] = await Promise.all([
        this.prisma.recordInvididual.findMany({
          where: { eventsId: Number(id) },
        }),
        this.prisma.recordGroup.findMany({
          where: { eventsId: Number(id) },
        }),
      ]);

      if (recordInv.length > 0 || recordGr.length > 0) {
        throw new HttpException(
          'Мероприятие нельзя удалить, на него есть записи',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (isEvent && isEvent.isDelete) {
        throw new HttpException(
          'Мероприятие уже удалено',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.prisma.events.update({
        where: { id: Number(id) },
        data: { isDelete: true },
      });
      return { message: 'Мероприятие удалено' };
    } catch (e) {
      console.log(e);
      if (e.code === 'P2025') {
        throw new HttpException('Мероприятие не найдено', HttpStatus.NOT_FOUND);
      }
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Неизвестная ошибка. Попробуйте позже',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getEvents(limit: number, page: number) {
    try {
      const events = await this.prisma.events.findMany({
        where: {
          isDelete: false,
        },
        include: { eventSpeciality: true },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: {
          id: 'desc',
        },
      });

      if (events.length === 0) {
        return { message: 'Нет мероприятий', data: [] };
      }

      const result = await Promise.all(
        events.map(async (event) => {
          const [records, recordGr] = await Promise.all([
            this.prisma.recordInvididual.findMany({
              where: { eventsId: event.id },
              orderBy: {
                createdAt: 'desc',
              },
            }),
            this.prisma.recordGroup.findMany({
              where: { eventsId: event.id },
              orderBy: {
                createdAt: 'desc',
              },
            }),
          ]);

          const count =
            records.length +
            recordGr.reduce((prev, acc) => prev + acc.countPeople, 0);

          return {
            event,
            ostalosMest: event.people_count - count,
          };
        }),
      );

      const total = await this.prisma.events.count({
        where: {
          isDelete: false,
        },
      });

      return { data: result, message: 'Мероприятия получены', total: total };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Ошибка при получении мероприятий',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
