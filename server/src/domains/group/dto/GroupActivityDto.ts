import { IsDate, IsDateString, IsString } from "class-validator";

export class GroupActiviryDto{
  @IsString()
  name: string;
  @IsDateString()
  startAt: string;
  @IsDateString()
  endAt: string;
}