import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../config/base.entity';
import { UserEntity } from '../users/users.entity';
@Entity({
  name: 'blogs',
})
export class BlogEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  slug: string;

  @Column()
  thumbnail: string;

  @Column()
  author_id: number;

  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.article)
  @JoinColumn({
    name: 'author_id',
  })
  author: UserEntity;
}
