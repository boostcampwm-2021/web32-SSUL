import { IsDateString, IsNumber, IsString } from "class-validator";

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
  createdAt: string
}
