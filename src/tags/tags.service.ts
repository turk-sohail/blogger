import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from './entities/tags.entity';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from './dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags) private readonly tagsRepo: Repository<Tags>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const tags = this.tagsRepo.create(createTagDto);
    await this.tagsRepo.save(tags);
    return tags;
  }

  async findMultipleTags(tags: number[]) {
    let results = await this.tagsRepo.find({
      where: {
        id: In(tags),
      },
    });

    return results;
  }

  async delete(id: number) {
    await this.tagsRepo.delete(id);
    return {
      deleted: true,
      id,
    };
  }
}
