import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Group } from './Group';

@Index('FK_GROUP_TO_GROUP_ENROLLMENT_1', ['groupId'], {})
@Entity('group_enrollment', { schema: 'ssul-local' })
export class GroupEnrollment {
  @Column('int', { primary: true, name: 'user_id' })
  userId: number;

  @Column('int', { primary: true, name: 'group_id' })
  groupId: number;

  @Column('varchar', { name: 'type', length: 20 })
  type: string;

  @ManyToOne(() => User, (user) => user.groupEnrollments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: User;

  @ManyToOne(() => Group, (group) => group.groupEnrollments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'group_id', referencedColumnName: 'groupId' }])
  group: Group;
}
