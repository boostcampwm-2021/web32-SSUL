import { JoinColumn, Entity, OneToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MentoringRequest } from './MentoringRequest';
import { User } from '@domains/user/models/User';

@Entity('mentor')
export class Mentor {
  @PrimaryGeneratedColumn({ name: 'mentor_id' })
  id: number;

  //TODO:need cascade
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @OneToMany(() => MentoringRequest, (mentoringRequest) => mentoringRequest.mentor)
  mentoringRequests: MentoringRequest[];
}
