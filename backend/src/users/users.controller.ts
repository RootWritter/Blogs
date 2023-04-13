import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from './users.entity';
import { JwtAuthGuard } from '@/guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAll(@Res() Res): Promise<UserEntity[]> {
    console.log('kesini');
    const data = await this.userService.findAll();
    return Res.json({
      status: true,
      message: 'Success',
      data: data,
    });
  }

  @Post('/create')
  async create(@Res() Res, @Body() body: UserDTO): Promise<any> {
    const data = await this.userService.create(body);
    if (!data) {
      Res.json({
        status: false,
        message: data,
        reason: null,
      });
    } else {
      Res.json({
        status: true,
        message: 'Success',
        data: data,
      });
    }
  }
}
