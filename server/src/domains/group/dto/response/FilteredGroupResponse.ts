import { Category } from '@domains/category/models/Category';
import { Group } from '@domains/group/models/Group';
import { GroupTechStack } from '@domains/techstack/models/GroupTechStack';
import { User } from '@domains/user/models/User';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';

class TechStackInfo {
  @IsNumber()
  id: number;
  @IsString()
  name: string;

  static from(groupTechStacks: GroupTechStack[]) {
    return groupTechStacks.map((groupTechStack) => {
      const dto = new TechStackInfo();
      dto.id = groupTechStack.id;
      dto.name = groupTechStack.name;
      return dto;
    });
  }
}

class CategoryInfo {
  @IsNumber()
  id: number;
  @IsString()
  name: string | null;

  static from(category: Category) {
    const dto = new CategoryInfo();
    dto.id = category.id;
    dto.name = category.name;
    return dto;
  }
}

class OwnerInfo {
  @IsNumber()
  id: number;
  @IsString()
  githubId: string | null;
  @IsString()
  name: string | null;
  @IsString()
  avatarUrl: string | null;
  @IsNumber()
  feverStack: number;

  static from(user: User) {
    const dto = new OwnerInfo();
    dto.id = user.id;
    dto.githubId = user.githubId;
    dto.name = user.name;
    dto.avatarUrl = user.avatarUrl;
    dto.feverStack = user.feverStack;
    return dto;
  }
}

export class FilteredGroup {
  @IsNumber()
  id: number;
  @IsNumber()
  mentorId: number | null;
  @IsNumber()
  ownerId: number | null;
  @IsString()
  name: string | null;
  @IsNumber()
  maxUserCnt: number | null;
  @IsNumber()
  curUserCnt: number | null;
  @IsString()
  intro: string | null;
  @IsDate()
  startAt: Date | null;
  @IsDate()
  endAt: Date | null;
  @IsString()
  status: string | null;

  @ValidateNested()
  @Type(() => TechStackInfo)
  techStacks: TechStackInfo[];

  @ValidateNested()
  @Type(() => CategoryInfo)
  category: CategoryInfo;

  @ValidateNested()
  @Type(() => OwnerInfo)
  ownerInfo: OwnerInfo;

  static from(group: Group) {
    const dto = new FilteredGroup();
    dto.id = group.id;
    dto.mentorId = group.mentorId;
    dto.ownerId = group.ownerId;
    dto.name = group.name;
    dto.maxUserCnt = group.maxUserCnt;
    dto.curUserCnt = group.curUserCnt;
    dto.intro = group.intro;
    dto.startAt = group.startAt;
    dto.endAt = group.endAt;
    dto.techStacks = TechStackInfo.from(group.techStacks);
    dto.category = CategoryInfo.from(group.category);
    dto.ownerInfo = OwnerInfo.from(group.ownerInfo);
    return dto;
  }
}

export class FilteredGroupResponse {
  @IsArray()
  groups: FilteredGroup[];
  @IsNumber()
  totalPages: number;

  static from(groups: Group[], totalPages: number) {
    const dto = new FilteredGroupResponse();
    dto.groups = groups.map((group) => FilteredGroup.from(group));
    dto.totalPages = totalPages;
    return dto;
  }
}
