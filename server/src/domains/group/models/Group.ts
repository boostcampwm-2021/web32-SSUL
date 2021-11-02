import { Column, Entity, OneToMany } from 'typeorm';
import { ApplyGroup } from './ApplyGroup';
import { GroupEnrollment } from '../../../../mm/entities/GroupEnrollment';
import { MentoringRequest } from '../../mentoring/models/MentoringRequest';
import { UsingTechStack } from '../../../../mm/entities/UsingTechStack';

@Entity('group', { schema: 'ssul-local' })
export class Group {
  @Column('int', { primary: true, name: 'group_id' })
  groupId: number;

  @Column('int', { name: 'mentor_id' })
  mentorId: number;

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

  @Column('varchar', { name: 'status', length: 10 })
  status: string;

  @OneToMany(() => ApplyGroup, (applyGroup) => applyGroup.group)
  applyGroups: ApplyGroup[];

  @OneToMany(() => GroupEnrollment, (groupEnrollment) => groupEnrollment.group)
  groupEnrollments: GroupEnrollment[];

  @OneToMany(() => MentoringRequest, (mentoringRequest) => mentoringRequest.group)
  mentoringRequests: MentoringRequest[];

  @OneToMany(() => UsingTechStack, (usingTechStack) => usingTechStack.group)
  usingTechStacks: UsingTechStack[];
}
