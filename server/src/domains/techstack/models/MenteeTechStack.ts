import { User } from '@domains/user/models/User';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mentee_tech_stack')
export class MenteeTechStack {
  @PrimaryGeneratedColumn({ name: 'mtet_id' })
  id: number;

  @Column('int', { name: 'user_id', nullable: true })
  menteeId: number;

  @Column('int', { name: 'tech_stack_id', nullable: true })
  techStackId: number;

  @Column('varchar', { name: 'tech_stack_name', nullable: true })
  techStackName: string;

  @ManyToOne(() => User, (user) => user.techStacks)
  user: User | null;
}
