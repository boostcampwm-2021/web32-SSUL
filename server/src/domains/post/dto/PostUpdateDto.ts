import { IsNumber, IsString, IsEnum, MinLength, MaxLength } from 'class-validator';
import { PostType } from '../models/Post';

export class PostUpdateDto {
  @IsNumber()
  id: number;

  @IsNumber()
  groupId: number;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(1023)
  content: string;

  @IsEnum(PostType)
  type: PostType;
}
