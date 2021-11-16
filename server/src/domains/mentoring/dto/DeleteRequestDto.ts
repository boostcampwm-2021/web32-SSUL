import { IsBoolean, IsNumber } from "class-validator";

export class DeleteRequestDto {
  @IsNumber()
  id: number;
  @IsNumber()
  mentorId: number;
  @IsNumber()
  groupId: number;
  @IsBoolean()
  accept: boolean;
}
