import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import * as bcrypt from 'bcrypt'
import { TokenService } from 'src/service/token.service';
import { log } from 'console';
@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwt: TokenService){}

    async login(login,password){
        if(!login.length){
            throw new HttpException("Логин пустой", HttpStatus.UNAUTHORIZED)
        }
        else if(!password.length){
            throw new HttpException("Пароль пустой", HttpStatus.UNAUTHORIZED)
        }
        
        const user = await this.prisma.user.findUnique({
            where:{
                login:login
            }
        })

        if(user){
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                throw new HttpException("Пароли не верные", HttpStatus.UNAUTHORIZED)
            }
            const data = { 
                id: user.id,
                login:user.login,
            }
            const accessToken = await this.jwt.generateAccessToken(data)
            const refreshToken = await this.jwt.generateRefreshToken(data)
            return {message:"Вы вошли", accessToken: accessToken, refreshToken: refreshToken, role: user.role}
        }
        throw new HttpException("Юзер не найден", HttpStatus.BAD_REQUEST);
    }

    async register(login,password){
        if(!login.length){
            return {message:"Логин пустой"}
        }
        else if(!password.length){
            return {message:"Пароль пустой"}
        }
        const user = await this.prisma.user.findUnique({
            where:{
                login:login
            }
        })
        if(user){
            throw new HttpException("Админ уже существует", HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const newUser = await this.prisma.user.create({
            data:{
                login:login,
                password:hashPassword
            }
        })
        return {message:"Вы создали аккаунт", data: newUser}
    }


    async token(token){
        const data = await this.jwt.verifyRefreshToken(token)
        if(data){
            const id = data.id
            //
            const user = await this.prisma.user.findUnique({
                where:{
                    id: id
                }
            })
            const newData = {
                id: id,
                login: data.login
            }
            const accessToken = await this.jwt.generateAccessToken(newData)
            const refreshToken = await this.jwt.generateRefreshToken(newData)
            return {message:"Вы вошли", accessToken: accessToken, refreshToken: refreshToken, role: user.role}
        }
        throw new HttpException("Session", HttpStatus.FORBIDDEN)
    }
}
