import { IsBoolean, IsNumber } from "class-validator";

export class MentorInfoDto {
  @IsBoolean()
  isMentor: boolean;
  @IsNumber()
  mentorId: number;
}
