import { Column, Entity, OneToMany, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { ApplyGroup } from '@domains/group/models/ApplyGroup';
import { GroupEnrollment } from '@domains/group/models/GroupEnrollment';
import { Profile } from './Profile';
import { Alarm } from '@domains/alarm/models/Alarm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column('varchar', { name: 'github_id', length: 50 })
  githubId: string;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'avatar_url', nullable: true, length: 100 })
  avatarUrl: string | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @OneToMany(() => ApplyGroup, (applyGroup) => applyGroup.user)
  applyGroups: ApplyGroup[];

  @OneToMany(() => GroupEnrollment, (groupEnrollment) => groupEnrollment.user)
  groupEnrollments: GroupEnrollment[];

  @OneToOne(() => Profile)
  profile: Profile;

  @OneToMany(() => Alarm, (alarm) => alarm.recieverId)
  receivedAlarms: Alarm[];
}
