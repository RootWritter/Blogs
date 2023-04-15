import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './blog.entity';
import { Repository } from 'typeorm';
import { CreatedBlogDto } from './dto/blog.created';
import * as fs from 'fs';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import string from '../utils/string';
import { UserEntity } from '../users/users.entity';
import { UpdateBlogDTO } from './dto/blog.updated';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogEntity: Repository<BlogEntity>,
  ) {}

  async all(): Promise<BlogEntity[]> {
    let data = await this.blogEntity.find({
      relations: ['author'],
    });
    return data;
  }
  async allByAuthor(user: UserEntity): Promise<BlogEntity[]> {
    let data = await this.blogEntity.find({
      where: {
        author_id: user.id,
      },
      relations: ['author'],
    });
    return data;
  }

  async findOne(id: number, user: UserEntity): Promise<BlogEntity> {
    let data = await this.blogEntity.findOne({
      where: {
        id: id,
        author_id: user.id,
      },
      relations: ['author'],
    });
    return data;
  }

  async findOneBySlug(slug: string): Promise<BlogEntity> {
    let data = await this.blogEntity.findOne({
      where: {
        slug: slug,
      },
      relations: ['author'],
    });
    return data;
  }

  async create(body: CreatedBlogDto, user: UserEntity): Promise<BlogEntity> {
    const base64 = body.images;
    const uuid = uuidv4();

    const images = await this.saveBase64Image(base64, uuid);
    const insertData = {
      title: body.title,
      content: body.content,
      thumbnail: images,
      slug: string.SlugHelper(body.title),
      author_id: user.id,
    };
    // const insert = await this.blogEntity.create(insertData);
    const insert = this.blogEntity.save(insertData);
    return insert;
  }

  async delete(id: number, user: UserEntity): Promise<boolean> {
    const deleteData = await this.blogEntity.delete({
      id: id,
      author_id: user.id,
    });
    return !deleteData ? false : true;
  }

  async update(id: number, body: UpdateBlogDTO): Promise<BlogEntity> {
    const dataOld = await this.blogEntity.findOne({
      where: {
        id: id,
      },
    });
    let images = '';
    if (body.images) {
      const base64 = body.images;
      const uuid = uuidv4();
      const directory = './public/uploads/images/';
      await fs.unlinkSync(`${directory}${dataOld.thumbnail}`);
      images = await this.saveBase64Image(base64, uuid);
    }
    images = dataOld.thumbnail;
    const updateData = {
      title: body.title,
      content: body.content,
      thumbnail: images,
      slug: string.SlugHelper(body.title),
      author_id: dataOld.author_id,
    };
    const update = await this.blogEntity.update(
      {
        id: id,
      },
      updateData,
    );
    return dataOld;
  }

  async saveBase64Image(base64Image: string, filename: string) {
    const matches = base64Image.match(
      /^data:image\/([A-Za-z-+/]+);base64,(.+)$/,
    );
    const extension = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    const directory = './public/uploads/images/';

    fs.mkdirSync(directory, {
      recursive: true,
    });
    const file = `${directory}${filename}.${extension}`;
    fs.writeFileSync(file, buffer);
    return `${filename}.${extension}`;
  }
}
