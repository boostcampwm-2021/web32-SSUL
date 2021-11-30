import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Index } from 'typeorm';
import { Group } from '@domains/group/models/Group';

@Entity('group_tech_stack')
export class GroupTechStack {
  @PrimaryGeneratedColumn({ name: 'gt_id' })
  id: number;

  @Column('int', { name: 'group_id' })
  groupId: number;

  @Column('int', { name: 'tech_stack_id', nullable: true })
  techStackId: number;

  @Index()
  @Column('varchar', { name: 'tech_stack_name', length: 255, nullable: true })
  name: string;

  @JoinColumn({ name: 'group_id' })
  @ManyToOne(() => Group, (group) => group.techStacks)
  group: Group | null;
}
