import { IsBoolean, IsNumber } from "class-validator";

export class CheckMentorDto {
  @IsBoolean()
  isMentor: boolean;
  @IsNumber()
  mentorId: number;
}
