import { IsDate, IsNumber, IsString, IsEnum, MaxLength, MinLength } from 'class-validator';
import { Post, PostType } from '../models/Post';

export class PostResponse {
  @IsNumber()
  id: number;
  @IsNumber()
  groupId: number;
  @IsNumber()
  userId: number;
  @IsString()
  writer: string;
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsDate()
  createdAt: Date | null;
  @IsEnum(PostType)
  type: PostType | string;
  @IsNumber()
  hit: number;

  static from(post: Post) {
    const dto = new PostResponse();
    dto.id = post.id;
    dto.groupId = post.groupId;
    dto.userId = post.userId;
    dto.writer = post.user.name;
    dto.title = post.title;
    dto.content = post.content;
    dto.createdAt = post.createdAt;
    dto.type = post.type;
    dto.hit = post.hit;
    return dto;
  }
}
