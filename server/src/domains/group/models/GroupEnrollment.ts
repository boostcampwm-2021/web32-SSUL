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

  @Column({ name: 'type', type: 'enum', enum: GroupEnrollmentAs })
  type: string;

  @ManyToOne(() => User, (user) => user.groupEnrollments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Group, (group) => group.groupEnrollments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'group_id' })
  group: Group;
}
