import { JoinColumn, Entity, OneToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MentoringRequest } from './MentoringRequest';
import { User } from '@domains/user/models/User';
import { MentorTechStack } from '@domains/techstack/models/MentorTechStack';

@Entity('mentor')
export class Mentor {
  @PrimaryGeneratedColumn({ name: 'mentor_id' })
  id: number;

  @OneToOne(() => User)
  userId: number;

  @OneToMany(() => MentoringRequest, (mentoringRequest) => mentoringRequest.mentor)
  mentoringRequests: MentoringRequest[];

  @OneToMany(() => MentorTechStack, (mentorTechStack) => mentorTechStack.mentor)
  techStacks: MentorTechStack[];
}
