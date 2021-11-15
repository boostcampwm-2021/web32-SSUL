import { IsString } from 'class-validator';

export class GithubUserDto {
  @IsString()
  githubId: string;
  @IsString()
  name: string;
  @IsString()
  avatarUrl: string;
}
