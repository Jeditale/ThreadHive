import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // Use the secret from .env
    });
  }

  async validate(payload: any) {
    console.log('JWT payload:', payload);
    return { userId: payload.userId, email: payload.email, isAdmin: payload.isAdmin };
  }
}
