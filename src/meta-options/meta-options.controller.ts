import { Controller, Post, Req, Body } from '@nestjs/common';
import { MetaOptionsService } from './meta-options.service';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private metaOptionsService: MetaOptionsService) {}

  @Post()
  createMetaOptions(@Body() createMetaOptionsDto: CreatePostMetaOptionsDto) {
    const metaOption =
      this.metaOptionsService.createMetaOptions(createMetaOptionsDto);
    return metaOption;
  }
}
