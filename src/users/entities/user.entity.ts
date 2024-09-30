import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn({})
  id: number;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  firstName: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  lastName: string;
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;
  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
