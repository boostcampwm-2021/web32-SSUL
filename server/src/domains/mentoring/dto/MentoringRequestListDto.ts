import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class MentoringRequestListDto {
  @IsNumber()
  id: number;
  @IsNumber()
  groupId: number;
  @IsString()
  groupName: string;
  @IsString()
  categoryImage: string;
  @IsString()
  ownerName: string;
  @IsDateString()
  createdAt: string;
}

export class MentoringRequestParam {
  @IsOptional()
  @IsNumber()
  mid: number;
}

export class MentoringCancelParam {
  @IsNumber()
  mentor: number;
  @IsNumber()
  group: number;
}
