import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOptions } from './entities/meta-options.entity';
import { Repository } from 'typeorm';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOptions)
    private readonly metaOptionsRepo: Repository<MetaOptions>,
  ) {}

  async createMetaOptions(createMetaOptionsDto: CreatePostMetaOptionsDto) {
    const metaOption = this.metaOptionsRepo.create(createMetaOptionsDto);
    return await this.metaOptionsRepo.save(metaOption);
  }
}
