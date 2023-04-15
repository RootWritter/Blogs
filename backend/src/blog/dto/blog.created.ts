import { IsString } from 'class-validator';

export class CreatedBlogDto {
  @IsString()
  images: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
