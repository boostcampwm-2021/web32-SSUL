import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Group } from './Group';

export enum PostType {
  NORMAL = 'NORMAL',
  NOTICE = 'NOTICE',
}

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn({ name: 'post_id' })
  id: number;

  @Column('int', { name: 'group_id' })
  groupId: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('varchar', { name: 'title', length: 100 })
  title: string;

  @Column('varchar', { name: 'content', length: 1023 })
  content: string;

  @Column('datetime', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column({ name: 'type', type: 'enum', enum: PostType })
  type: PostType;

  @Column('int', { name: 'hit' })
  hit: number;

  @ManyToOne(() => Group, (group) => group.posts)
  group: Group;
}
