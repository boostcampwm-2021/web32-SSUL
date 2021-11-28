import { ApplyGroup } from '@domains/group/models/ApplyGroup';
import { Group } from '@domains/group/models/Group';
import { MentoringRequest } from '@domains/mentoring/models/MentoringRequest';
import { IsNumber, IsString } from 'class-validator';
import { Alarm, AlarmType } from '../models/Alarm';

export class AlarmDto {
  @IsNumber()
  senderId: number;
  @IsNumber()
  receiverId: number;
  @IsNumber()
  groupId: number;
  @IsString()
  type: string;

  public toEntity() {
    const entity = new Alarm();
    entity.senderId = this.senderId;
    entity.receiverId = this.receiverId;
    entity.groupId = this.groupId;
    entity.type = this.type;
    entity.createdAt = new Date();
    entity.readChk = false;
    return entity;
  }

  static fromApply(applyGroup: ApplyGroup, type: AlarmType) {
    const dto = new AlarmDto();
    if (type === AlarmType.JOIN_GROUP_REQUEST) {
      dto.senderId = applyGroup.userId;
      dto.receiverId = applyGroup.group.ownerId;
    } else {
      dto.senderId = applyGroup.group.ownerId;
      dto.receiverId = applyGroup.userId;
    }
    dto.groupId = applyGroup.groupId;
    dto.type = type;
    return dto;
  }

  static fromGroup(group: Group, type: AlarmType) {
    const dto = new AlarmDto();
    if (type === AlarmType.MENTORING_REQUEST) {
      dto.senderId = group.ownerId;
      dto.receiverId = group.mentorId!;
    } else {
      dto.senderId = group.mentorId!;
      dto.receiverId = group.ownerId;
    }
    dto.groupId = group.id;
    dto.type = type;
    return dto;
  }

  static fromMentoringRequest(mentoringRequeset: MentoringRequest, type: AlarmType) {
    const dto = new AlarmDto();
    if (type === AlarmType.MENTORING_REQUEST) {
      dto.senderId = mentoringRequeset.group.ownerId;
      dto.receiverId = mentoringRequeset.mentor.userId!;
    } else {
      dto.senderId = mentoringRequeset.mentor.userId!;
      dto.receiverId = mentoringRequeset.group.ownerId;
    }
    dto.groupId = mentoringRequeset.groupId;
    dto.type = type;
    return dto;
  }
}
