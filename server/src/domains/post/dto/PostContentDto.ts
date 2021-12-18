import { IsNumber, IsString, IsEnum, MaxLength, MinLength } from 'class-validator';
import { Post, PostType } from '../models/Post';

export class PostContentDto {
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
