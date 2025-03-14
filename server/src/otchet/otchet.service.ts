import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { SchoolDTO } from './dto/SchoolDTO';

@Injectable()
export class OtchetService {
    constructor(private readonly prisma: PrismaService){}

    async getPeopleYear(year){
        try{
            const dataI = await this.prisma.recordInvididual.findMany({
                where:{
                    events:{
                        date:{
                            gte: new Date(Number(year), 0, 1), // Больше или равно 1 января 2024 года
                            lte: new Date(Number(year), 11, 31), // Меньше или равно 31 декабря 2024 года
                        }
                    }
                },
                include:{
                    events: true
                }
            })
            const dataG = await this.prisma.recordGroup.findMany({
                where:{
                    events:{
                        date:{
                            gte: new Date(Number(year), 0, 1), // Больше или равно 1 января 2024 года
                            lte: new Date(Number(year), 11, 31), // Меньше или равно 31 декабря 2024 года
                        }
                    }
                },
                include:{
                    events:true
                }
            })
            const dataGL = dataG.reduce((acc,rec)=>{
                const count = Number(rec.countPeople) || 0
                return count + acc
            },0)
            return {data:dataI.length + dataGL}
        }
        catch(e){
            console.log(e)
        }
    }

    async getPeopleMounth(m,y){
        console.log(m)
        try{
            const dataI = await this.prisma.recordInvididual.findMany({
                where:{
                    events:{
                        date:{
                            gte: new Date(Number(y), Number(m-1),1),
                            lte: new Date(Number(y), Number(m-1),31),
                        }
                    }
                },
                include:{
                    events:true
                }
            })
            const dataG = await this.prisma.recordGroup.findMany({
                where:{
                    events:{
                        date:{
                            gte: new Date(Number(y), Number(m-1),1),
                            lte: new Date(Number(y), Number(m-1),31),
                        }
                    }
                },
                include:{
                    events:true
                }
            })
            
            const dataGL = dataG.reduce((acc,rec)=>{
                const count = Number(rec.countPeople) || 0
                return count + acc
            },0)
            return {message: dataI.length+dataGL}
        }
        catch(e){

        }
    }


    async getSpesialVost(){
        //и какие спец. как я должен это понять алье?? 
        try{
            const data = await this.prisma.events.groupBy({
                by: ['specialityId'],
                _count: {
                    id:true,
                },
                orderBy:{
                    _count: {
                        id:'desc'
                    },
                },
            })
    
            const thisData = await this.prisma.eventSpeciality.findFirst({
                where:{
                    id: Number(data[0]?.specialityId)
                }
            })
        
            return {data:thisData}
        }
        catch(e){
            return {message:"Не известная ошибка"}
        }
    }


    async getPeopleCountSpec(){
        const result = []

        // {
        //     'spec',
        //     'count',
        //     'school'
        // }


        const recordGr = await this.prisma.recordGroup.findMany({
            select:{
                id:true,
                school:true,
                countPeople:true,
                events:{
                    include:{
                        eventSpeciality:{
                            select:{
                                title:true
                            }
                        }
                    }
                }
            }
        })
        const recordInv = await this.prisma.recordInvididual.findMany({
            select:{
                id:true,
                school:true,
                events:{
                    include:{
                        eventSpeciality:{
                            select:{
                                title:true
                            }
                        }
                    }
                }
            }
        })

    
        
        for(let i = 0;i<recordGr.length; i++){
            const spec = recordGr[i].events.eventSpeciality.title
            const school = recordGr[i].school
            const peopleCount = recordGr[i].countPeople
            const dataObj = {
                spec:spec,
                count:peopleCount,
                school:school
            }
            const findData = result.find((e)=> e.school == dataObj.school && e.spec == dataObj.spec)
            if(findData){
                findData.count += dataObj.count
            }
            else{
                result.push(dataObj)
            }
        }

        for(let i = 0;i<recordInv.length; i++){
            const spec = recordInv[i].events.eventSpeciality.title
            const school = recordInv[i].school
            const peopleCount = 1
            const dataObj = {
                spec:spec,
                count:peopleCount,
                school:school
            }
            const findData = result.find((e)=> e.school == dataObj.school && e.spec == dataObj.spec)
            if(findData){
                findData.count += dataObj.count
            }
            else{
                result.push(dataObj)
            }
        }
    
        return result
        
    }


    async school(type: SchoolDTO){
        if(!type){
            //а это возможно?
            throw new HttpException("Нету поля type", 500)
        }
        else{
            const schoolInv = await this.prisma.recordInvididual.findMany({
                select:{
                    id:true,
                    school:true,
                }
            })
            const schoolGro = await this.prisma.recordGroup.findMany({
                select:{
                    id:true,
                    school:true,
                }
            })
            const allData = [...schoolInv, ...schoolGro]
            const f = allData.filter((value,index,data)=> index === data.findIndex(e=>e.school == value.school)).map((e)=> {
                const id = Math.floor(Date.now() * Math.random() * 0.5)
                return {id:id, school: e.school}
            })
            return {message:"Школы посетили мероприятия", data:f}
        }
    }
}
