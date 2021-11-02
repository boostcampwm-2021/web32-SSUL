import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@domains/user/models/User';
import { Group } from './Group';

export enum ApplyGroupState {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLIEND = 'DECLINED',
}

@Entity('apply_group')
export class ApplyGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ApplyGroupState })
  state: ApplyGroupState;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @ManyToOne(() => User, (user) => user.applyGroups, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: User;

  @ManyToOne(() => Group, (group) => group.applyGroups, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'group_id', referencedColumnName: 'groupId' }])
  group: Group;
}
