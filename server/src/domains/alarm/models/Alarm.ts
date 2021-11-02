import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { AlarmType } from '@domains/common/enums';
import { User } from '@domains/user/models/User';

@Entity('alarm')
export class Alarm {
  @PrimaryGeneratedColumn({ name: 'alarm_id' })
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  senderId: number;

  @ManyToOne(() => User)
  @Column({ name: 'reciever_id' })
  recieverId: number;

  @Column({
    name: 'type',
    type: 'enum',
    enum: AlarmType,
  })
  type: AlarmType;

  @Column('varchar', { name: 'content', nullable: true, length: 255 })
  content: string | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('tinyint', { name: 'read_chk', nullable: true, width: 1 })
  readChk: boolean | null;
}
