import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tech_stack')
export class TechStack {
  @IsNumber()
  @PrimaryGeneratedColumn({ name: 'tech_stack_id' })
  id: number;

  @IsString()
  @Column('varchar', { name: 'name', length: 255 })
  name: string;
}
