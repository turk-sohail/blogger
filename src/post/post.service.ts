import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { MetaOptions } from 'src/meta-options/entities/meta-options.entity';

@Injectable()
export class PostService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOptions)
    private readonly metaOptionsRepo: Repository<MetaOptions>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    let author = await this.usersService.findOne(createPostDto.authorId);

    let post = this.postRepository.create({ ...createPostDto, author });

    return await this.postRepository.save(post);
  }
  async findAll() {
    return await this.postRepository.find({
      relations: {
        author: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: number) {
    const post = await this.postRepository.findOneBy({ id });
    await this.postRepository.remove(post);
    return { deleted: true, id };
  }
}
