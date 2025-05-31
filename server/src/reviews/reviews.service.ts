import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { ReviewsDTO } from './dto/ReviewsDTO';
import * as luxon from 'luxon';
@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async createViews(body: ReviewsDTO, secretKey) {
    try {
      if (!body.reviews || !body.name || !body.stars) {
        throw new HttpException(
          'Не все поля заполнены',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (
        Number(body.stars) >= 4) {
        await this.prisma.reviews.create({
          data: {
            title: body.reviews,
            name: body.name,
            stars: Number(body.stars),
            createdAt: luxon.DateTime.now().toISO(),
          },
        });
      }
      return { message: 'Отзыв создан' };
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

  async getReviews() {
    try {
      const reviews = await this.prisma.reviews.findMany();
      if (reviews) {
        return { data: reviews.reverse() };
      }
      return { message: 'Отзывов нет.' };
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

  async deleteReview(id) {
    try {
      const isReviews = await this.prisma.reviews.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (isReviews) {
        await this.prisma.reviews.delete({
          where: {
            id: Number(id),
          },
        });
        return { message: 'Успешно удален отзыв' };
      }
      throw new HttpException('Отзыв не найден', HttpStatus.NOT_FOUND);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(
        'Неизвестная ошибка. Попробуйте позже',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
