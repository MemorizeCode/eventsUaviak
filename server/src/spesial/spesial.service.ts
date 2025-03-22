import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { SpesialDTO } from './dto/SpesialDTO';

@Injectable()
export class SpesialService {
    constructor(private readonly prisma:PrismaService){}

    async getSpesial(){
        try{
            const data = await this.prisma.eventSpeciality.findMany()
            if(!data){
                return {message: "Специальности отсуствоую", data: []}
            }
            return {message: "Специальности найдены", data}
        }
        catch(e){
            throw new HttpException("Не известная ошибка. Попробуйте позже", HttpStatus.BAD_REQUEST)
        }
    }

    async updateSpecial(body:SpesialDTO){
        try{
            const isSpecial = await this.prisma.eventSpeciality.findUnique({
                where: {id: Number(body.id)}
            })
            if(!isSpecial){
                throw new HttpException("Специальность не найдена", HttpStatus.NOT_FOUND)
            }
            await this.prisma.eventSpeciality.update({  
                where: {id: Number(body.id)},
                data: {
                    title: body.title,
                }
            })
            return {message: "Специальность обновлена"}
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

