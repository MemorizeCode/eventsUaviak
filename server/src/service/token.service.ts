import { Injectable } from "@nestjs/common";
import { sign, verify } from "jsonwebtoken"

@Injectable()
export class TokenService {
    private readonly access = 'accessSS'
    private readonly refresh = 'refreshSSS'

    generateAccessToken(payload: any): string {
        return sign(payload, this.access, {
            expiresIn: '10m',
        })
    }

    generateRefreshToken(payload: any): string {
        return sign(payload, this.refresh, {
            expiresIn: '1d',
        })
    }


    verifyAccessToken(token) {
        try {
            const verifyTokenData = verify(token, this.access)
            if (verifyTokenData) {
                return verifyTokenData
            }
            return false
        }
        catch (e) {
            return false
        }
    }

    verifyRefreshToken(token) {
        try {
            const verifyTokenData = verify(token, this.refresh)
            if (verifyTokenData) {
                return verifyTokenData
            }
            return false

        }

        catch (e) {
            return false
        }
    }
}