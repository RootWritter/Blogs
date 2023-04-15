import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/users.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../users/user.dto';
import { LoginDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@/interface/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private readonly userService: UsersService,
    private readonly jwtServices: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userEntity.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    const token = await this.jwtServices.sign(
      {
        email: user.email,
        id: user.id,
        name: user.name,
      },
      { expiresIn: '24h' },
    );
    return {
      user: {
        email: user.email,
        id: user.id,
        name: user.name,
      },
      access_token: token,
    };
  }

  async register(body: UserDTO): Promise<any> {
    const user = await this.userEntity.findOne({
      where: {
        email: body.email,
      },
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const newUser = this.userEntity.create({
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, salt),
    });
    await this.userEntity.save(newUser);
    const token = this.jwtServices.sign(
      {
        email: newUser.email,
        id: newUser.id,
      },
      { expiresIn: '24h' },
    );
    return {
      user: {
        email: newUser.email,
        id: newUser.id,
        name: newUser.name,
      },
      access_token: token,
    };
  }
  async getAuthenticatedUser(payload: JwtPayload) {
    try {
      const user = await this.userService.getByEmail(payload.email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
