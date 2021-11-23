import { IsDate, IsNumber, IsString, IsEnum, MaxLength, MinLength } from 'class-validator';
import { Post, PostType } from '../models/Post';

export class PostDto {
  @IsNumber()
  id: number;
  @IsNumber()
  groupId: number;
  @IsNumber()
  userId: number;
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsDate()
  createdAt: Date | null;
  @IsEnum(PostType)
  type: PostType;
  @IsNumber()
  hit: number;
}
