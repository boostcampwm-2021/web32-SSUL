import { Category } from '@domains/category/models/Category';
import { User } from '@domains/user/models/User';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Group } from '../models/Group';

class SimpleUserInfo {
  @IsString()
  avatarUrl: string;

  static from(user: User) {
    const dto = new SimpleUserInfo();
    dto.avatarUrl = user.avatarUrl;
    return dto;
  }
}

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

export class SimpleGroupCardResponse {
  @IsNumber()
  id: number;

  @IsNumber()
  mentorId: number | null;

  @IsString()
  name: string;

  @IsNumber()
  maxUserCnt: number;

  @IsNumber()
  curUserCnt: number;

  @IsString()
  status: string;

  @IsString()
  intro: string | null;

  @IsDate()
  startAt: Date | null;

  @IsDate()
  endAt: Date | null;

  @ValidateNested()
  @Type(() => SimpleUserInfo)
  ownerInfo: SimpleUserInfo;

  @ValidateNested()
  @Type(() => SimpleCategoryInfo)
  category: SimpleCategoryInfo;

  static from(group: Group) {
    const dto = new SimpleGroupCardResponse();
    dto.id = group.id;
    dto.mentorId = group.mentorId;
    dto.name = group.name;
    dto.maxUserCnt = group.maxUserCnt;
    dto.curUserCnt = group.curUserCnt;
    dto.status = group.status;
    dto.intro = group.intro;
    dto.startAt = group.startAt;
    dto.ownerInfo = SimpleUserInfo.from(group.ownerInfo);
    dto.category = SimpleCategoryInfo.from(group.category);
    return dto;
  }
}
