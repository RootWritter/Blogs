import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { BlogEntity } from './blog.entity';
import { CreatedBlogDto } from './dto/blog.created';
import { resolve } from 'node:path/win32';
import { UserEntity } from '../users/users.entity';
import { UpdateBlogDTO } from './dto/blog.updated';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/')
  async list(@Res() Res, @Req() req): Promise<BlogEntity[]> {
    const data = await this.blogService.all();
    return Res.json({
      status: true,
      message: 'Success',
      data: data,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Get('/list')
  async listByAuthor(@Res() Res, @Req() req): Promise<BlogEntity[]> {
    const data = await this.blogService.allByAuthor(req.user);
    return Res.json({
      status: true,
      message: 'Success',
      data: data,
    });
  }
  @Get('/read/:slug')
  async getbySlug(@Res() Res, @Req() req): Promise<BlogEntity[]> {
    const data = await this.blogService.findOneBySlug(req.params.slug);
    return Res.json({
      status: true,
      message: 'Success',
      data: data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async one(@Res() Res, @Req() req): Promise<BlogEntity> {
    const data = await this.blogService.findOne(req.params.id, req.user);
    return Res.json({
      status: true,
      message: 'Success',
      data: data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(
    @Res() res,
    @Req() req,
    @Body() body: CreatedBlogDto,
  ): Promise<any> {
    const data = await this.blogService.create(body, req.user);
    if (!data) {
      res.json({
        status: false,
        message: null,
        data: null,
      });
    } else {
      res.json({
        status: true,
        message: 'Success',
        data: data,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async update(
    @Res() res,
    @Req() req,
    @Body() body: UpdateBlogDTO,
  ): Promise<any> {
    const data = await this.blogService.update(req.params.id, body);
    if (!data) {
      res.json({
        status: false,
        message: null,
        data: null,
      });
    } else {
      res.json({
        status: true,
        message: 'Success',
        data: data,
      });
    }
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Res() res, @Req() req): Promise<any> {
    const data = await this.blogService.delete(req.params.id, req.user);
    if (!data) {
      res.json({
        status: false,
        message: 'Failed to delete',
      });
    } else {
      res.json({
        status: true,
        message: 'Success',
      });
    }
  }
}
