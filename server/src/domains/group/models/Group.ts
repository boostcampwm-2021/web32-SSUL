import { Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { ApplyGroup } from './ApplyGroup';
import { GroupEnrollment } from './GroupEnrollment';
import { MentoringRequest } from '@domains/mentoring/models/MentoringRequest';
import { GroupTechStack } from '@domains/techstack/models/GroupTechStack';
import { Category } from '@domains/category/models/Category';
import { User } from '@domains/user/models/User';
import { Post } from '../../post/models/Post';
import { Alarm } from '@domains/alarm/models/Alarm';

export enum GroupState {
  READY = 'READY',
  DOING = 'DOING',
  END = 'END',
}

@Entity('group')
export class Group {
  @PrimaryGeneratedColumn({ name: 'group_id' })
  id: number;

  @Column('int', { name: 'mentor_id', nullable: true })
  mentorId: number | null;

  @Column('int', { name: 'owner_id' })
  ownerId: number;

  @Column('int', { name: 'category_id', nullable: true })
  categoryId: number | null;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('int', { name: 'max_user_cnt' })
  maxUserCnt: number;

  @Column('int', { name: 'cur_user_cnt' })
  curUserCnt: number;

  @Column('varchar', { name: 'intro', nullable: true, length: 1023 })
  intro: string | null;

  @Column('datetime', { name: 'start_at', nullable: true })
  startAt: Date | null;

  @Column('datetime', { name: 'end_at', nullable: true })
  endAt: Date | null;

  @Column('varchar', { name: 'status', length: 10, default: 'READY' })
  status: GroupState | string;

  @JoinColumn({ name: 'owner_id' })
  @ManyToOne(() => User, (user) => user.groups, { eager: true })
  ownerInfo: User;

  @ManyToOne(() => Category, (category) => category.id, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => ApplyGroup, (applyGroup) => applyGroup.group)
  applyGroups: ApplyGroup[];

  @OneToMany(() => GroupEnrollment, (groupEnrollment) => groupEnrollment.group)
  groupEnrollments: GroupEnrollment[];

  @OneToMany(() => MentoringRequest, (mentoringRequest) => mentoringRequest.group)
  mentoringRequests: MentoringRequest[];

  @OneToMany(() => GroupTechStack, (groupTechStack) => groupTechStack.group)
  techStacks: GroupTechStack[];

  @OneToMany(() => Post, (post) => post.group)
  posts: Post[];

  @OneToMany(() => Alarm, (alarm) => alarm.group)
  alarms: Alarm[];
}
