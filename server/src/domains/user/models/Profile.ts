import { Column, Entity, OneToMany } from 'typeorm';
import { UsingTechStack } from './UsingTechStack';

@Entity('profile', { schema: 'ssul-local' })
export class Profile {
  @Column('int', { primary: true, name: 'profile_id' })
  profileId: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('float', { name: 'fever_stack', precision: 12 })
  feverStack: number;

  @Column('float', { name: 'share_stack', precision: 12 })
  shareStack: number;

  @Column('varchar', { name: 'intro', nullable: true, length: 500 })
  intro: string | null;

  @OneToMany(() => UsingTechStack, (usingTechStack) => usingTechStack.profile)
  usingTechStacks: UsingTechStack[];
}
