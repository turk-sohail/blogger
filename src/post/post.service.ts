import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { MetaOptions } from 'src/meta-options/entities/meta-options.entity';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
export class PostService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOptions)
    private readonly metaOptionsRepo: Repository<MetaOptions>,
    private readonly tagService: TagsService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    let author = await this.usersService.findOne(createPostDto.authorId);

    let tags = await this.tagService.findMultipleTags(createPostDto.tags);

    let post = this.postRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    return await this.postRepository.save(post);
  }
  async findAll() {
    return await this.postRepository.find({
      relations: {
        author: true,
        tags: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  //update tags associated with post
  async update(id: number, updatePostDto: UpdatePostDto) {
    const tags = await this.tagService.findMultipleTags(updatePostDto.tags);
    const post = await this.postRepository.findOneBy({
      id,
    });
    (post.title = updatePostDto.title ?? post.title),
      (post.content = updatePostDto.content ?? post.content);
    post.status = updatePostDto.status ?? post.status;
    (post.postType = updatePostDto.postType ?? post.postType),
      (post.slug = updatePostDto.slug ?? post.slug),
      (post.featuredImageUrl =
        updatePostDto.featuredImageUrl ?? post.featuredImageUrl),
      (post.publishedOn = updatePostDto.publishedOn ?? post.publishedOn);

    post.tags = tags;

    return await this.postRepository.save(post);
  }

  async remove(id: number) {
    const post = await this.postRepository.findOneBy({ id });
    await this.postRepository.remove(post);
    return { deleted: true, id };
  }
}
