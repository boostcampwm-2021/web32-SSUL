import { IsNumber, IsString, IsEnum } from 'class-validator';
import { UsingTechAs } from '@domains/techstack/models/UsingTechStack';

export class UserDto {
  @IsNumber()
  id: number;
  @IsString()
  githubId: string;
  @IsString()
  name: string;
  @IsString()
  avatarUrl: string;
  @IsNumber()
  feverStack: number;
  @IsNumber()
  shareStack: number;
  @IsString()
  role?: string;
}

export class GroupUserDto {
  @IsNumber()
  userId: number;
  @IsString()
  githubId: string;
  @IsString()
  name: string;
  @IsString()
  avatarUrl: string;
  @IsEnum(UsingTechAs)
  type: string;
}
