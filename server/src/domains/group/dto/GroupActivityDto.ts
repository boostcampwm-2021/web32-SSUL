import { IsDate, IsString } from "class-validator";

export class GroupActiviryDto{
  @IsString()
  name: string;
  @IsDate()
  startAt: Date;
  @IsDate()
  endAt: Date;
}