import { ApplyGroup } from '@domains/group/models/ApplyGroup';
import { Group } from '@domains/group/models/Group';
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
    dto.senderId = applyGroup.userId;
    dto.receiverId = applyGroup.group.ownerId;
    dto.groupId = applyGroup.groupId;
    dto.type = type;
    return dto;
  }

  static fromGroup(group: Group, type: AlarmType) {
    const dto = new AlarmDto();
    dto.senderId = group.mentorId!;
    dto.receiverId = group.ownerId;
    dto.groupId = group.id;
    dto.type = type;
    return dto;
  }
}
