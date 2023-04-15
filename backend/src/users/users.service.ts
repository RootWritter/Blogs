import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  async findById(id: number): Promise<UserEntity> {
    return await this.userEntity.findOne({
      where: { id: id },
    });
  }

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.userEntity.findOne({
      where: { email: email },
    });
  }

  async create(body: UserDTO): Promise<UserDTO> {
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
    return newUser;
  }

  async findAll() {
    return this.userEntity.find();
  }
}
