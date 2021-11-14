import { IsArray, IsNumber } from "class-validator";

export class RegisterMentoDto {
  @IsNumber()
  userId: number;
  @IsArray()
  techStacks: string[];
}
