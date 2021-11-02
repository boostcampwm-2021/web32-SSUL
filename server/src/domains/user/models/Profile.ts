import { Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { UsingTechStack } from '@domains/common/models/UsingTechStack';
import { User } from '@domains/user/models/User';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn({ name: 'profile_id' })
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userId: User;

  @Column('float', { name: 'fever_stack', precision: 12 })
  feverStack: number;

  @Column('float', { name: 'share_stack', precision: 12 })
  shareStack: number;

  @Column('varchar', { name: 'intro', nullable: true, length: 500 })
  intro: string | null;

  @OneToMany(() => UsingTechStack, (usingTechStack) => usingTechStack.profile)
  usingTechStacks: UsingTechStack[];
}
