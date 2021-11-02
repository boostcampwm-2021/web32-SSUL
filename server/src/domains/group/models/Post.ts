import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn({ name: 'post_id' })
  id: number;

  @Column('int', { name: 'group_id' })
  groupId: number;

  @Column('varchar', { name: 'title', length: 100 })
  title: string;

  @Column('varchar', { name: 'content', length: 500 })
  content: string;
}
