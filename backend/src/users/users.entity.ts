import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../config/base.entity';
import { BlogEntity } from '../blog/blog.entity';

@Entity({
  name: 'users',
})
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => BlogEntity, (BlogEntity) => BlogEntity.author)
  article: BlogEntity[];
}
