import { IsNumber, IsString } from 'class-validator';

export class GroupUserDto {
  @IsNumber()
  userId: number;
  @IsString()
  githubId: string;
  @IsString()
  name: string;
  @IsString()
  avatarUrl: string;
  @IsString()
  type: string;
}
