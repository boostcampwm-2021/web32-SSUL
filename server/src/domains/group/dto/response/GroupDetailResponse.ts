import { IsArray, IsDate, IsNumber, IsString, IsEnum } from 'class-validator';
import { GroupUserDto } from '@domains/user/dto/GroupUserDto';
import { GroupUsingTechStackDto } from '@domains/techstack/dto/usingTechStackDto';
import { Group } from '../../models/Group';

export enum GroupState {
  READY = 'READY',
  DOING = 'DOING',
  END = 'END',
}

export class GroupDetailResponse {
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

  static from(group: Group) {
    const dto = new GroupDetailResponse();
    dto.id = group.id;
    dto.mentorId = group.mentorId!;
    dto.ownerId = group.ownerId;
    dto.name = group.name;
    dto.maxUserCnt = group.maxUserCnt;
    dto.curUserCnt = group.curUserCnt;
    dto.intro = group.intro;
    dto.startAt = group.startAt;
    dto.endAt = group.endAt;
    dto.status = group.status;
    dto.techStacks = group.techStacks;
    dto.groupEnrollments = group.groupEnrollments
      .map((groupEnrollment) => GroupUserDto.from(groupEnrollment))
      .sort((a, b) => {
        if (a.type > b.type) return 1;
        else return -1;
      });
    return dto;
  }
}
