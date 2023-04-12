import { Body, Controller, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/create')
  async create(@Res() Res, @Body() body: UserDTO): Promise<any> {
    const data = await this.userService.create(body);
    if (!data) {
      Res.json({
        status: false,
        message: 'Failed',
        reason: data,
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
