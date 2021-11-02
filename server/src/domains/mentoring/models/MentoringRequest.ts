import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Mentor } from './Mentor';
import { Group } from './Group';

@Index('FK_GROUP_TO_MENTORING_REQUEST_1', ['groupId'], {})
@Entity('mentoring_request', { schema: 'ssul-local' })
export class MentoringRequest {
  @Column('int', { primary: true, name: 'mentor_id' })
  mentorId: number;

  @Column('int', { primary: true, name: 'group_id' })
  groupId: number;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @ManyToOne(() => Mentor, (mentor) => mentor.mentoringRequests, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'mentor_id', referencedColumnName: 'mentorId' }])
  mentor: Mentor;

  @ManyToOne(() => Group, (group) => group.mentoringRequests, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'group_id', referencedColumnName: 'groupId' }])
  group: Group;
}
