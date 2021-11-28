import { User } from '@domains/user/models/User';
import { IsString } from 'class-validator';

const DEFAULT_FEVER_STACK = 36.5;
const DEFAULT_SHARE_STACK = 0;

export class GithubUserDto {
  @IsString()
  githubId: string;
  @IsString()
  name: string;
  @IsString()
  avatarUrl: string;

  public toEntity() {
    const entity = new User();
    entity.githubId = this.githubId;
    entity.name = this.name;
    entity.avatarUrl = this.avatarUrl;
    entity.feverStack = DEFAULT_FEVER_STACK;
    entity.shareStack = DEFAULT_SHARE_STACK;
    entity.intro = '';
    entity.createdAt = new Date();
    return entity;
  }
}
