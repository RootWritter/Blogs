import { IsString } from 'class-validator';

export class BlogDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  thumbnail: string;
}
