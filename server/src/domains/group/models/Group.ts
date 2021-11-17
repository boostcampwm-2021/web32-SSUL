import { Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { ApplyGroup } from './ApplyGroup';
import { GroupEnrollment } from './GroupEnrollment';
import { MentoringRequest } from '@domains/mentoring/models/MentoringRequest';
import { UsingTechStack } from '@domains/techstack/models/UsingTechStack';
import { Category } from '@domains/category/models/Category';
import { Post } from './Post';

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

  @Column('varchar', { name: 'name', nullable: true, length: 200 })
  name: string | null;

  @Column('int', { name: 'max_user_cnt', nullable: true })
  maxUserCnt: number | null;

  @Column('int', { name: 'cur_user_cnt', nullable: true })
  curUserCnt: number | null;

  @Column('varchar', { name: 'intro', nullable: true, length: 500 })
  intro: string | null;

  @Column('datetime', { name: 'start_at', nullable: true })
  startAt: Date | null;

  @Column('datetime', { name: 'end_at', nullable: true })
  endAt: Date | null;

  @Column('int', { name: 'category_id', nullable: true })
  categoryId: number | null;

  // @Column({ name: 'status', type: 'enum', enum: GroupState, default: GroupState.READY })
  @Column('varchar', { name: 'status', nullable: true, length: 500, default: 'READY' })
  status: string;

  @ManyToOne((type) => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => ApplyGroup, (applyGroup) => applyGroup.group)
  applyGroups: ApplyGroup[];

  @OneToMany(() => GroupEnrollment, (groupEnrollment) => groupEnrollment.group)
  groupEnrollments: GroupEnrollment[];

  @OneToMany(() => MentoringRequest, (mentoringRequest) => mentoringRequest.group)
  mentoringRequests: MentoringRequest[];

  @OneToMany(() => UsingTechStack, (usingTechStack) => usingTechStack.group)
  usingTechStacks: UsingTechStack[];

  @OneToMany(() => Post, (post) => post.group)
  posts: Post[];
}
