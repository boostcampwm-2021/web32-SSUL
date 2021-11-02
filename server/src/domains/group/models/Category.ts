import { Column, Entity } from 'typeorm';

@Entity('category', { schema: 'ssul-local' })
export class Category {
  @Column('int', { primary: true, name: 'category_id' })
  categoryId: number;

  @Column('int', { name: 'group_id' })
  groupId: number;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { name: 'image_url', nullable: true, length: 100 })
  imageUrl: string | null;
}
