import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Mentor } from '@domains/mentoring/models/Mentor';
import { Group } from '@domains/group/models/Group';

@Entity('mentoring_request')
export class MentoringRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @ManyToOne(() => Mentor, (mentor) => mentor.mentoringRequests, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  @JoinColumn({ name: 'mentor_id' })
  mentor: Mentor;

  @ManyToOne(() => Group, (group) => group.mentoringRequests, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  @JoinColumn({ name: 'group_id' })
  group: Group;
}
