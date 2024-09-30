import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { MetaOptionsModule } from 'src/meta-options/meta-options.module';
import { MetaOptions } from 'src/meta-options/entities/meta-options.entity';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Post, MetaOptions]),
    MetaOptionsModule,
  ],
})
export class PostModule {}
