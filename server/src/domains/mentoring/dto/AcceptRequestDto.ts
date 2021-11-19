import { IsNumber } from "class-validator";

export class AcceptRequestDto {
  @IsNumber()
  id: number;
  @IsNumber()
  userId: number;
  @IsNumber()
  groupId: number;
}
