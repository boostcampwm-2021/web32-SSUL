import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Mentor } from '@domains/mentoring/models/Mentor';

@Entity('mentor_tech_stack')
export class MentorTechStack {
  @PrimaryGeneratedColumn({ name: 'mtrt_id' })
  id: number;

  @Column('int', { name: 'mentor_id' })
  mentorId: number;

  @Column('int', { name: 'tech_stack_id' })
  techStackId: number;

  @Column('varchar', { name: 'tech_stack_name', length: 255, nullable: true })
  techStackName: string;

  @ManyToOne(() => Mentor, (mentor) => mentor.techStacks)
  mentor: Mentor | null;
}
