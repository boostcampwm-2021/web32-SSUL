import { IsArray, IsDate, IsNumber, IsString, IsEnum } from 'class-validator';
import { GroupUserDto } from '@domains/user/dto/UserDto';
import { GroupUsingTechStackDto } from '@domains/techstack/dto/usingTechStackDto';

export enum GroupState {
  READY = 'READY',
  DOING = 'DOING',
  END = 'END',
}

export class GroupDetailDto {
  @IsNumber()
  id: number;
  @IsNumber()
  mentorId?: number;
  @IsNumber()
  ownerId: number;
  @IsString()
  name: string | null;
  @IsNumber()
  maxUserCnt: number | null;
  @IsNumber()
  curUserCnt: number | null;
  @IsString()
  intro: string | null;
  @IsDate()
  startAt: Date | null;
  @IsDate()
  endAt: Date | null;
  @IsEnum(GroupState)
  status: string;
  @IsArray()
  techStacks: GroupUsingTechStackDto[];
  @IsArray()
  groupEnrollments: GroupUserDto[];
}

export class GroupParam {
  @IsNumber()
  gid: number;
}

export class GroupPostParam {
  @IsNumber()
  gid: number;
  @IsNumber()
  pid: number;
}

export class PostParam {
  @IsNumber()
  pid: number;
}
