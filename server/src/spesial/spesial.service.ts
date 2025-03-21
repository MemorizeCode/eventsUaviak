import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';

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
}

