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
    res.json(login);
  }

  @Post('register')
  async register(@Req() req, @Body() body: UserDTO, @Res() res): Promise<any> {
    const register = await this.authService.register(body);
    res.json(register);
  }
}
