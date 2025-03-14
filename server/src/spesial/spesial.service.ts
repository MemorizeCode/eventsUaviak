import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';

@Injectable()
export class SpesialService {
    constructor(private readonly prisma:PrismaService){}

    async createSpesial(title){
        try{
            const newSpesial = await this.prisma.eventSpeciality.create({
                data:{
                    title:title
                }
            })
            return {message:"Новая специальность создана"}
        }
        catch(e){
            console.log(e)
            throw new HttpException("Ошибка создания", HttpStatus.FORBIDDEN)
        }
    }

    async deleteSpesial(id){
        try{
            const d = await this.prisma.eventSpeciality.delete({
                where:{
                    id: Number(id)
                }
            })
            if(!d){
                throw new HttpException("Ошибка удаления", 403)
            }
            return {message:"Успешно удалено"}
        }
        catch(e){
            throw new HttpException("Ошибка удаления", HttpStatus.FORBIDDEN)
        }
    }
    
    async getSpesial(){
        try{
            const data = await this.prisma.eventSpeciality.findMany()
            return data
        }
        catch(e){
            console.log(e)
        }
    }
}
