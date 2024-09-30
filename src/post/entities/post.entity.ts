import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-meta-options.dto';
import { postStatus, postType } from '../enums/post.enum';
import { MetaOptions } from 'src/meta-options/entities/meta-options.entity';
import { Users } from 'src/users/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', nullable: false })
  title: string;
  @Column({
    type: 'enum',
    enum: postType,
    nullable: false,
    default: postType.POST,
  })
  postType: postType;
  @Column({ type: 'varchar', nullable: false, unique: true })
  slug: string;

  @Column({
    type: 'enum',
    enum: postStatus,
    nullable: false,
    default: postStatus.DRAFT,
  })
  status: postStatus;
  @Column({ type: 'text', nullable: true })
  content?: string;
  @Column({ type: 'text', nullable: true })
  schema?: string;
  @Column({ type: 'varchar', nullable: true })
  featuredImageUrl?: string;
  @Column({ type: 'datetime', nullable: true })
  publishedOn?: Date;
  tags?: string[];
  @OneToOne(() => MetaOptions, (metaOption) => metaOption.post, {
    cascade: true,
    eager: true,
  })
  metaOptions?: MetaOptions;

  @ManyToOne(() => Users, (user) => user.posts)
  author: Users;
}
