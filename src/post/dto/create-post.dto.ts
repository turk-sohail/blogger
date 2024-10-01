import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { postStatus } from '../enums/post.enum';
import { postType } from '../enums/post.enum';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  title: string;

  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @IsString()
  @IsNotEmpty()
  slug: string;
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;
  @IsString()
  @IsOptional()
  content: string;
  @IsOptional()
  schema: string;
  @IsOptional()
  @IsUrl()
  featuredImageUrl: string;
  @IsOptional()
  publishedOn?: Date;
  @IsInt()
  @IsNotEmpty()
  authorId: number;
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto | null;
}
