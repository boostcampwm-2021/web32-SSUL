import { IsNumber, IsString } from 'class-validator';
import { Alarm } from '../models/Alarm';

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
}
