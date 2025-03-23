import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class TokenService {
  private readonly access: string;
  private readonly refresh: string;

  constructor() {
    this.access = process.env.ACCESS_KEY;
    this.refresh = process.env.REFRESH_KEY;

    if (!this.access || !this.refresh) {
      throw new Error('Не удается получить ключи');
    }
  }

  generateAccessToken(payload: any): string {
    return sign(payload, this.access, {
      expiresIn: '10m',
    });
  }

  generateRefreshToken(payload: any): string {
    return sign(payload, this.refresh, {
      expiresIn: '1d',
    });
  }

  verifyAccessToken(token) {
    try {
      const verifyTokenData = verify(token, this.access);
      if (verifyTokenData) {
        return verifyTokenData;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  verifyRefreshToken(token) {
    try {
      const verifyTokenData = verify(token, this.refresh);
      if (verifyTokenData) {
        return verifyTokenData;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}
