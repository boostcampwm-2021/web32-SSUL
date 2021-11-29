import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '@domains/user/models/User';
import { Group } from './Group';

export enum GroupEnrollmentAs {
  OWNER = 'OWNER',
  MENTOR = 'MENTOR',
  MENTEE = 'MENTEE',
}

@Entity('group_enrollment')
export class GroupEnrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('int', { name: 'group_id' })
  groupId: number;

  @Column('varchar', { name: 'type' })
  type: GroupEnrollmentAs | string;

  @ManyToOne(() => User, (user) => user.groupEnrollments, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @JoinColumn({ name: 'group_id' })
  @ManyToOne(() => Group, (group) => group.groupEnrollments, {
    eager: true,
  })
  group: Group;
}
