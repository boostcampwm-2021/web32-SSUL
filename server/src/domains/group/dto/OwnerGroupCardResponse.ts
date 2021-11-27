import { Category } from '@domains/category/models/Category';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Group } from '../models/Group';

class CategoryInfo {
  @IsString()
  name: string | null;

  @IsString()
  imageUrl: string | null;

  static from(category: Category) {
    const dto = new CategoryInfo();
    dto.name = category.name;
    dto.imageUrl = category.imageUrl;
    return dto;
  }
}

export class OwnerGroupCardResponse {
  @IsNumber()
  id: number;

  @IsNumber()
  mentorId: number | null;

  @IsString()
  name: string;

  @IsString()
  intro: string | null;

  @IsDate()
  startAt: Date | null;

  @IsDate()
  endAt: Date | null;

  @ValidateNested()
  @Type(() => CategoryInfo)
  category: CategoryInfo;

  static from(group: Group) {
    const dto = new OwnerGroupCardResponse();
    dto.id = group.id;
    dto.mentorId = group.mentorId;
    dto.name = group.name;
    dto.intro = group.intro;
    dto.startAt = group.startAt;
    dto.endAt = group.endAt;
    dto.category = CategoryInfo.from(group.category);
    return dto;
  }
}
