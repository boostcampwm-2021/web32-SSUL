import { Column, Entity } from 'typeorm';
import { AlarmType } from '@domains/common/enums';

@Entity('alarm', { schema: 'ssul-local' })
export class Alarm {
  @Column('int', { primary: true, name: 'alarm_id' })
  alarmId: number;

  @Column('int', { name: 'sender_id' })
  senderId: number;

  @Column('int', { name: 'reciever_id' })
  recieverId: number;

  @Column('varchar', { name: 'content', nullable: true, length: 255 })
  content: string | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('tinyint', { name: 'read_chk', nullable: true, width: 1 })
  readChk: boolean | null;
}
