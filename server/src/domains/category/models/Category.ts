import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';

@Entity('category')
export class Category {
  @IsNumber()
  @PrimaryGeneratedColumn({ name: 'category_id' })
  id: number;

  @IsString()
  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @IsString()
  @Column('varchar', { name: 'image_url', nullable: true, length: 500 })
  imageUrl: string | null;
}
