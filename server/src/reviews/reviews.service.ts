import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { ReviewsDTO } from './dto/ReviewsDTO';
import { secretKeyConst } from 'src/const/key';


@Injectable()
export class ReviewsService {
    constructor(private readonly prisma: PrismaService) { }

    async createViews(body: ReviewsDTO, secretKey) {
        try{
            if(Number(body.stars)>=4){
                await this.prisma.reviews.create({    
                    data: {
                        title: body.reviews,
                        name: body.name,
                        stars: Number(body.stars)
                    }
                })
                return {message: "Отзыв создан"}
            }
            throw new HttpException("Ошибка создания отзыва. Попробуйте позже.", HttpStatus.FORBIDDEN)
        }
        catch(e){
            console.log(e)
        }
    }

    async getReviews() {
        try {
            const reviews = await this.prisma.reviews.findMany()
            if (reviews) {
                return reviews
            }
            return { message: "Отзывов нет." }
        }
        catch (e) {
            throw new HttpException("Не известная ошибка.", 400)
        }
    }

    async deleteReviews(id){
        try{
            const deleteReviews = await this.prisma.reviews.delete({
                where:{
                    id:Number(id)
                }
            })
            
            return {message:"Успешно удален отзыв"}
        }
        catch(e){
            throw new HttpException("Ошибка удаления. Проверьте существует ли отзыв", 401)

        }
    }

}
