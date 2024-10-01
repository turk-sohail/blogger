import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from './entities/tags.entity';
import { TagsService } from './tags.service';

@Module({
  controllers: [TagsController],
  imports: [TypeOrmModule.forFeature([Tags])],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
