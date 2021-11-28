import { IsNumber, IsString, IsEnum } from 'class-validator';
import { PostType } from '../models/Post';

export class PostUpdateDto {
  @IsNumber()
  id: number;
  @IsNumber()
  groupId: number;
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsEnum(PostType)
  type: PostType;
}
