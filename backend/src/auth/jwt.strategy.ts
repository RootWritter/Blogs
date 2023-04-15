import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from '@/interface/jwt.interface';
import 'dotenv/config';
import { Request } from 'express';
import { UserDTO } from '../users/user.dto';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<UserDTO> {
    const user = await this.authService.getAuthenticatedUser(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    req.user = user;
    return user;
  }
}
