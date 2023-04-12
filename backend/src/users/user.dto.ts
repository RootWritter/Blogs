import { IsEmail, IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
