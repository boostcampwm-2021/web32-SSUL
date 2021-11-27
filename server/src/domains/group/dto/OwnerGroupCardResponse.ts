import { Category } from '@domains/category/models/Category';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Group } from '../models/Group';
import { SimpleGroupCardResponse } from './SimpleGroupCardResponse';

class SimpleCategoryInfo {
  @IsString()
  name: string | null;

  @IsString()
  imageUrl: string | null;

  static from(category: Category) {
    const dto = new SimpleCategoryInfo();
    dto.name = category.name;
    dto.imageUrl = category.imageUrl;
    return dto;
  }
}

export class OwnerGroupCardResponse extends SimpleGroupCardResponse {
  @IsNumber()
  mentorId: number | null;

  @IsString()
  intro: string | null;

  @IsDate()
  startAt: Date | null;

  @IsDate()
  endAt: Date | null;

  @ValidateNested()
  @Type(() => SimpleCategoryInfo)
  category: SimpleCategoryInfo;

  static from(group: Group) {
    const dto = new OwnerGroupCardResponse();
    dto.mentorId = group.mentorId;
    dto.intro = group.intro;
    dto.startAt = group.startAt;
    dto.endAt = group.startAt;
    dto.category = SimpleCategoryInfo.from(group.category);
    return dto;
  }
}
