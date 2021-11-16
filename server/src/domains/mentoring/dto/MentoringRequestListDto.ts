import { IsArray, IsDateString, IsNumber, IsString } from "class-validator";

export class MentoringRequestListDto {
  @IsString()
  groupName: string;
  @IsString()
  categoryImage: string;
  @IsString()
  ownerName: string;
  @IsDateString()
  createdAt: string
}
