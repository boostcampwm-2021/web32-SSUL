import { Entity, OneToOne, OneToMany, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MentoringRequest } from './MentoringRequest';
import { User } from '@domains/user/models/User';
import { MentorTechStack } from '@domains/techstack/models/MentorTechStack';

@Entity('mentor')
export class Mentor {
  @PrimaryGeneratedColumn({ name: 'mentor_id' })
  id: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @JoinColumn({ name: 'user_id' })
  @OneToOne(() => User)
  user: User;

  @OneToMany(() => MentoringRequest, (mentoringRequest) => mentoringRequest.mentor)
  mentoringRequests: MentoringRequest[];

  @OneToMany(() => MentorTechStack, (mentorTechStack) => mentorTechStack.mentor)
  techStacks: MentorTechStack[];
}
