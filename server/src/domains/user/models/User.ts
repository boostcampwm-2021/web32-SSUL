import { Column, Entity, OneToMany } from 'typeorm';
import { ApplyGroup } from '../../group/models/ApplyGroup';
import { GroupEnrollment } from './GroupEnrollment';

@Entity('user', { schema: 'ssul-local' })
export class User {
  @Column('int', { primary: true, name: 'user_id' })
  userId: number;

  @Column('int', { name: 'github_id' })
  githubId: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'avatar_url', nullable: true, length: 100 })
  avatarUrl: string | null;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @OneToMany(() => ApplyGroup, (applyGroup) => applyGroup.user)
  applyGroups: ApplyGroup[];

  @OneToMany(() => GroupEnrollment, (groupEnrollment) => groupEnrollment.user)
  groupEnrollments: GroupEnrollment[];
}
