import { Column, Entity, OneToMany } from 'typeorm';
import { MentoringRequest } from './MentoringRequest';

@Entity('mentor', { schema: 'ssul-local' })
export class Mentor {
  @Column('int', { primary: true, name: 'mentor_id' })
  mentorId: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @OneToMany(() => MentoringRequest, (mentoringRequest) => mentoringRequest.mentor)
  mentoringRequests: MentoringRequest[];
}
