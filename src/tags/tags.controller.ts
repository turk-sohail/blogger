import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Post()
  async create(@Body() createTagsDto: CreateTagDto) {
    const tags = await this.tagsService.create(createTagsDto);
    return tags;
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.tagsService.delete(id);
  }
}
