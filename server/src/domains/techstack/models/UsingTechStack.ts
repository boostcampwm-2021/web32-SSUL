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

  @Column('int', { name: 'group_id', nullable: true })
  groupId: number;

  @Column('int', { name: 'profile_id', nullable: true })
  profileId: number;

  @Column('int', { name: 'tech_stack_id', nullable: true })
  techStackId: number;

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

  @ManyToOne(() => TechStack, (techStack) => techStack.id)
  @JoinColumn({ name: 'tech_stack_id' })
  techStack: TechStack;
}
