import { IsNumber, IsString } from 'class-validator';

export class UserResponse {
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
