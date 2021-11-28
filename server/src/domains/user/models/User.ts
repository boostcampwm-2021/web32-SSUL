import { Column, Entity, OneToMany, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { ApplyGroup } from '@domains/group/models/ApplyGroup';
import { GroupEnrollment } from '@domains/group/models/GroupEnrollment';
import { Alarm } from '@domains/alarm/models/Alarm';
import { MenteeTechStack } from '@domains/techstack/models/MenteeTechStack';
import { Group } from '@domains/group/models/Group';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column('varchar', { name: 'github_id', length: 50 })
  githubId: string;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'avatar_url', length: 511 })
  avatarUrl: string;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('float', { name: 'fever_stack', nullable: true, precision: 2 })
  feverStack: number;

  @Column('float', { name: 'share_stack', nullable: true, precision: 2 })
  shareStack: number;

  @Column('varchar', { name: 'intro', nullable: true, length: 1023 })
  intro: string | null;

  @OneToMany(() => Group, (group) => group.ownerInfo)
  groups: Group[];

  @OneToMany(() => ApplyGroup, (applyGroup) => applyGroup.user)
  applyGroups: ApplyGroup[];

  @OneToMany(() => GroupEnrollment, (groupEnrollment) => groupEnrollment.user)
  groupEnrollments: GroupEnrollment[];

  @OneToMany(() => Alarm, (alarm) => alarm.receiverId)
  receivedAlarms: Alarm[];

  @OneToMany(() => MenteeTechStack, (menteeTechStack) => menteeTechStack.user)
  techStacks: MenteeTechStack[];
}
