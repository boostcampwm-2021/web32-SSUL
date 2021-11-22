import {
  IsArray,
  IsDate,
  IsNumber,
  IsString,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
} from 'class-validator';
import { GroupUserDto } from '@domains/user/dto/UserDto';
import { GroupUsingTechStackDto } from '@domains/techstack/dto/usingTechStackDto';

export enum GroupState {
  READY = 'READY',
  DOING = 'DOING',
  END = 'END',
}

export interface Group {
  id: number;
  mentorId: number;
  ownerId: number;
  name: string | null;
  maxUserCnt: number | null;
  curUserCnt: number | null;
  intro: string | null;
  startAt: Date | null;
  endAt: Date | null;
  status: GroupState;
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
  @IsNumber({ allowNaN: false })
  gid: number;
}
