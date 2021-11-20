import { User } from '@domains/user/models/User';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mentee_tech_stack')
export class MenteeTechStack {
  @PrimaryGeneratedColumn({ name: 'mtet_id' })
  id: number;

  @Column('int', { name: 'user_id', nullable: true })
  userId: number;

  @Column('int', { name: 'tech_stack_id', nullable: true })
  techStackId: number;

  @Column('varchar', { name: 'tech_stack_name', nullable: true })
  name: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.techStacks)
  user: User | null;
}
