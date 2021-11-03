import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tech_stack')
export class TechStack {
  @PrimaryGeneratedColumn({ name: 'tech_stack_id' })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;
}
