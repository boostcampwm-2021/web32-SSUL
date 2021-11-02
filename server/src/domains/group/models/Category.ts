import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  id: number;

  @Column('int', { name: 'group_id' })
  groupId: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { name: 'image_url', nullable: true, length: 100 })
  imageUrl: string | null;
}
