import { IsNumber, isString, IsString } from 'class-validator';

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

export class UserGroupRoleDto extends UserDto {
  @IsString()
  groupRole: string;
}
