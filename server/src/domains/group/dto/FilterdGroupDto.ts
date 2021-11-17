import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';

export class FilterdGroupDto {
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
  startAt: Date;
  @IsDate()
  endAt: Date;
  @IsNumber()
  categoryId: number | null;
  @IsString()
  status: string | null;
  @IsArray()
  techStackList: string[];
  @IsNumber()
  ownerName: number | null;
  @IsString()
  ownerFeverStack: string | null;
  @IsString()
  ownerAvatarUrl: string | null;
}

export class FilterdPageGroupDto {
  @IsArray()
  groups: FilterdGroupDto[];
  @IsNumber()
  totalPages: number;
}
