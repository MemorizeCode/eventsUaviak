import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { PrismaService } from "src/service/prisma.service";
import { TokenService } from "src/service/token.service";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly jwt: TokenService, private readonly prisma: PrismaService){}
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const headers = request.headers.authorization
        if(!headers){
            throw new HttpException("Нету токена", 404)
        }
        const token = headers.split(' ')[1]
        try{
            const decoded = await this.jwt.verifyAccessToken(token)
            if(decoded){
                const id = decoded.id
                const isAdmin = await this.prisma.user.findUnique({
                    where:{
                        id:id
                    }
                })
                if(isAdmin.role == "ADMIN"){
                    return true
                }
                return false
            }
            else{
                return false
            }
        }
        catch(e){
            console.log(e)
            throw new UnauthorizedException('Не верный  токен авторизации');
        }
    }
}