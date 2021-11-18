import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsingTechStack } from './UsingTechStack';

@Entity('tech_stack')
export class TechStack {
  @IsNumber()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @IsString()
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @OneToMany(() => UsingTechStack, (usingTechStack) => usingTechStack.techStack)
  usingTechStack: UsingTechStack[];
}
