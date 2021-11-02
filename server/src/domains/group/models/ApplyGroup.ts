import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/models/User';
import { Group } from './Group';

@Index('FK_GROUP_TO_APPLY_GROUP_1', ['groupId'], {})
@Entity('apply_group', { schema: 'ssul-local' })
export class ApplyGroup {
  @Column('int', { primary: true, name: 'user_id' })
  userId: number;

  @Column('int', { primary: true, name: 'group_id' })
  groupId: number;

  @Column('varchar', { name: 'state', length: 20 })
  state: string;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @ManyToOne(() => User, (user) => user.applyGroups, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: User;

  @ManyToOne(() => Group, (group) => group.applyGroups, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'group_id', referencedColumnName: 'groupId' }])
  group: Group;
}
