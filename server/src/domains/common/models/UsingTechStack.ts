import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Group } from './Group';
import { Profile } from './Profile';
import { TechStack } from './TechStack';

@Index('FK_GROUP_TO_USING_TECH_STACK_1', ['groupId'], {})
@Index('FK_TECH_STACK_TO_USING_TECH_STACK_1', ['techStackId'], {})
@Entity('using_tech_stack', { schema: 'ssul-local' })
export class UsingTechStack {
  @Column('int', { primary: true, name: 'profile_id' })
  profileId: number;

  @Column('int', { primary: true, name: 'group_id' })
  groupId: number;

  @Column('int', { primary: true, name: 'tech_stack_id' })
  techStackId: number;

  @Column('varchar', { name: 'type', length: 20 })
  type: string;

  @ManyToOne(() => Group, (group) => group.usingTechStacks, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'group_id', referencedColumnName: 'groupId' }])
  group: Group;

  @ManyToOne(() => Profile, (profile) => profile.usingTechStacks, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'profile_id', referencedColumnName: 'profileId' }])
  profile: Profile;

  @ManyToOne(() => TechStack, (techStack) => techStack.usingTechStacks, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'tech_stack_id', referencedColumnName: 'techStackId' }])
  techStack: TechStack;
}
