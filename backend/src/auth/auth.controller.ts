import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { UserDTO } from '../users/user.dto';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() req, @Body() body: LoginDto, @Res() res): Promise<any> {
    const login = await this.authService.validateUser(
      body.email,
      body.password,
    );
    if (!login) {
      res.json({
        status: false,
        message: 'Invalid Request',
        validation: login,
        data: null,
      });
    } else {
      res.json({
        status: true,
        message: 'Success',
        data: login,
      });
    }
  }

  @Post('register')
  async register(@Req() req, @Body() body: UserDTO, @Res() res): Promise<any> {
    const register = await this.authService.register(body);
    if (!register) {
      res.json({
        status: false,
        message: register,
        data: null,
      });
    } else {
      res.json({
        status: true,
        message: 'Success',
        data: register,
      });
    }
  }
}
