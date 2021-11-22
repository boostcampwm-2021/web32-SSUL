import { IsDate, IsNumber, IsString, IsEnum } from 'class-validator';
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

export class PostContentDto {
  @IsNumber()
  groupId: number;
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsEnum(PostType)
  type: PostType;

  toEntity(userId: number): Post {
    const post: Post = new Post();

    post.userId = userId;
    post.groupId = this.groupId;
    post.title = this.title;
    post.content = this.content;
    post.type = this.type;
    post.createdAt = new Date();
    post.hit = 0;

    return post;
  }
}
