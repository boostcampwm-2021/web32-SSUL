import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { Alarm } from '../models/Alarm';

export class AlarmListResponse {
  @IsNumber()
  id: number | null;
  @IsNumber()
  senderId: number | null;
  @IsString()
  senderName: string | null;
  @IsNumber()
  receiverId: number | null;
  @IsNumber()
  groupId: number | null;
  @IsString()
  groupName: string | null;
  @IsString()
  type: string | null;
  @IsDate()
  createdAt: Date | null;
  @IsBoolean()
  readChk: boolean | null;

  static from(alarm: Alarm) {
    const dto = new AlarmListResponse();
    dto.id = alarm.id;
    dto.senderId = alarm.senderId;
    dto.receiverId = alarm.receiverId;
    dto.groupId = alarm.groupId;
    dto.type = alarm.type;
    dto.createdAt = alarm.createdAt;
    dto.readChk = alarm.readChk;
    dto.senderName = alarm.sender.name;
    dto.groupName = alarm.group.name;
    return dto;
  }
}
