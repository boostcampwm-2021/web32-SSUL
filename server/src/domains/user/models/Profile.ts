import { Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { UsingTechStack } from '@domains/techstack/models/UsingTechStack';
import { User } from '@domains/user/models/User';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn({ name: 'profile_id' })
  id: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('float', { name: 'fever_stack', precision: 12 })
  feverStack: number;

  @Column('float', { name: 'share_stack', precision: 12 })
  shareStack: number;

  @Column('varchar', { name: 'intro', nullable: true, length: 500 })
  intro: string | null;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => UsingTechStack, (usingTechStack) => usingTechStack.profile)
  usingTechStacks: UsingTechStack[];
}
