import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { Alarm } from '../models/Alarm';

export class AlarmListResponse {
  @IsNumber()
  id: number;
  @IsNumber()
  senderId: number;
  @IsString()
  senderName: string;
  @IsNumber()
  receiverId: number;
  @IsNumber()
  groupId: number;
  @IsString()
  groupName: string | null;
  @IsString()
  type: string;
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
