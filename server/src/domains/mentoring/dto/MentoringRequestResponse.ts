import { Group } from '@domains/group/models/Group';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Mentor } from '../models/Mentor';
import { MentoringRequest } from '../models/MentoringRequest';

class MentorInfo {
  @IsString()
  id: number;

  static from(mentor: Mentor) {
    const dto = new MentorInfo();
    dto.id = mentor.id;
    return dto;
  }
}

class GroupInfo {
  @IsNumber()
  id: number;

  static from(group: Group) {
    const dto = new GroupInfo();
    dto.id = group.id;
    return dto;
  }
}

export class MentoringRequestResponse {
  @IsNumber()
  id: number;

  @ValidateNested()
  @Type(() => MentorInfo)
  mentor: MentorInfo;

  @ValidateNested()
  @Type(() => GroupInfo)
  group: GroupInfo;

  static from(mentoringRequest: MentoringRequest) {
    const dto = new MentoringRequestResponse();
    dto.id = mentoringRequest.id;
    dto.mentor = MentorInfo.from(mentoringRequest.mentor);
    dto.group = GroupInfo.from(mentoringRequest.group);
    return dto;
  }
}
