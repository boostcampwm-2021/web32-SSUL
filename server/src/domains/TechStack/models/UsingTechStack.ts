import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Group } from '@domains/group/models/Group';
import { Profile } from '@domains/user/models/Profile';
import { TechStack } from './TechStack';

export enum UsingTechAs {
  GROUP = 'GROUP',
  MENTOR = 'MENTOR',
  MENTEE = 'MENTEE',
}

@Entity('using_tech_stack')
export class UsingTechStack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UsingTechAs })
  type: string;

  @ManyToOne(() => Group, (group) => group.usingTechStacks, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'group_id' })
  group: Group | null;

  @ManyToOne(() => Profile, (profile) => profile.usingTechStacks, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile | null;

  @OneToOne(() => TechStack)
  @JoinColumn({ name: 'tech_stack_id' })
  techStack: TechStack;
}
