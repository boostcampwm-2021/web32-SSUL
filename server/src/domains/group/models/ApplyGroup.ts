import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@domains/user/models/User';
import { Group } from './Group';

export enum ApplyGroupState {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

@Entity('apply_group')
export class ApplyGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('int', { name: 'group_id' })
  groupId: number;

  @Column('varchar', { name: 'state' })
  state: ApplyGroupState | string;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @ManyToOne(() => User, (user) => user.applyGroups, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Group, (group) => group.applyGroups, {
    eager: true,
  })
  @JoinColumn({ name: 'group_id' })
  group: Group;
}
