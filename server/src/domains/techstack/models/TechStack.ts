import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsingTechStack } from './UsingTechStack';

@Entity('tech_stack')
export class TechStack {
  @PrimaryGeneratedColumn({ name: 'tech_stack_id' })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @OneToMany(() => UsingTechStack, (usingTechStack) => usingTechStack.techStack)
  usingTechStack: UsingTechStack[];
}
