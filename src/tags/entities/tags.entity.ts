import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;
  @Column({ type: 'varchar', unique: true, nullable: false })
  slug: string;
  @Column({ type: 'text', nullable: true })
  description?: string;
  @Column({ type: 'text', nullable: true })
  schema?: string;
  @Column({ type: 'varchar', nullable: true })
  featuredImageUrl?: string;
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => Post, (post) => post.tags, {
    eager: true,
    onDelete: 'CASCADE',
  })
  posts: Post;
}
