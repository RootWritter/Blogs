import { IsOptional, IsString } from 'class-validator';

export class UpdateBlogDTO {
  @IsOptional()
  @IsString()
  images: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
