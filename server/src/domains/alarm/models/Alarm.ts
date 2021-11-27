import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '@domains/user/models/User';
import { Group } from '@domains/group/models/Group';

export enum AlarmType {
  JOIN_GROUP_REQUEST = 'JOIN_GROUP_REQUEST',
  MENTORING_REQUEST = 'MENTORING_REQUEST',
  JOIN_GROUP_ACCEPTED = 'JOIN_GROUP_ACCEPTED',
  MENTORING_ACCEPTED = 'MENTORING_ACCEPTED',
  JOIN_GROUP_DECLINED = 'JOIN_GROUP_DECLINED',
  METTORING_DECLIEND = 'METTORING_DECLIEND',
}

@Entity('alarm')
export class Alarm {
  @PrimaryGeneratedColumn({ name: 'alarm_id' })
  id: number;

  @Column({ name: 'sender_id' })
  senderId: number;

  @Column({ name: 'reciever_id' })
  recieverId: number;

  @Column({ name: 'group_id' })
  groupId: number;

  @Column('varchar', { name: 'type', length: 100 })
  type: AlarmType | string;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('tinyint', { name: 'read_chk', nullable: true, width: 1 })
  readChk: boolean | null;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reciever_id' })
  reciever: User;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;
}
